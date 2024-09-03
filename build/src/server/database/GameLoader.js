"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLoader = void 0;
const prometheus = require("prom-client");
const Database_1 = require("./Database");
const Game_1 = require("../Game");
const Types_1 = require("../../common/Types");
const Cache_1 = require("./Cache");
const mnemonist_1 = require("mnemonist");
const timer_1 = require("../utils/timer");
const durations_1 = require("../utils/durations");
const Timer_1 = require("../../common/Timer");
const metrics = {
    initialize: new prometheus.Gauge({
        name: 'gameloader_initialize',
        help: 'Time to load all games',
        registers: [prometheus.register],
    }),
    evictions: new prometheus.Counter({
        name: 'gameloader_evictions',
        help: 'Game evictions count',
        registers: [prometheus.register],
    }),
};
class GameLoader {
    constructor(config, clock) {
        this.config = config;
        this.clock = clock;
        this.cache = new Cache_1.Cache(config, clock);
        this.purgedGames = [];
        (0, timer_1.timeAsync)(this.cache.load())
            .then((v) => {
            metrics.initialize.set(v.duration);
        });
    }
    static getInstance() {
        if (GameLoader.instance === undefined) {
            const config = parseConfigString(process.env.GAME_CACHE ?? '');
            GameLoader.instance = new GameLoader(config, new Timer_1.Clock());
        }
        return GameLoader.instance;
    }
    static newTestInstance(config, clock) {
        return new GameLoader(config, clock);
    }
    resetForTesting() {
        this.cache = new Cache_1.Cache(this.config, this.clock);
        this.cache.load();
    }
    async add(game) {
        const d = await this.cache.getGames();
        d.games.set(game.id, game);
        if (game.spectatorId !== undefined) {
            d.participantIds.set(game.spectatorId, game.id);
        }
        for (const player of game.getPlayers()) {
            d.participantIds.set(player.id, game.id);
        }
    }
    async getIds() {
        const d = await this.cache.getGames();
        const map = new mnemonist_1.MultiMap();
        d.participantIds.forEach((gameId, participantId) => map.set(gameId, participantId));
        const arry = Array.from(map.associations());
        return arry.map(([gameId, participantIds]) => ({ gameId, participantIds }));
    }
    async isCached(gameId) {
        const d = await this.cache.getGames();
        return d.games.get(gameId) !== undefined;
    }
    async getGame(id, forceLoad = false) {
        const d = await this.cache.getGames();
        const gameId = (0, Types_1.isGameId)(id) ? id : d.participantIds.get(id);
        if (gameId === undefined)
            return undefined;
        if (forceLoad === false && d.games.get(gameId) !== undefined)
            return d.games.get(gameId);
        if (d.games.has(gameId)) {
            try {
                const serializedGame = await Database_1.Database.getInstance().getGame(gameId);
                if (serializedGame === undefined) {
                    console.error(`GameLoader:loadGame: game ${gameId} not found`);
                    return undefined;
                }
                const game = Game_1.Game.deserialize(serializedGame);
                await this.add(game);
                console.log(`GameLoader loaded game ${gameId} into memory from database`);
                return game;
            }
            catch (e) {
                console.error('GameLoader:loadGame', e);
                return undefined;
            }
        }
        return undefined;
    }
    async restoreGameAt(gameId, saveId) {
        const current = await this.getGame(gameId);
        if (current === undefined) {
            console.error('GameLoader cannot find game ' + gameId);
            throw new Error('Cannot find game');
        }
        const currentSaveId = current.lastSaveId;
        const serializedGame = await Database_1.Database.getInstance().getGameVersion(gameId, saveId);
        const game = Game_1.Game.deserialize(serializedGame);
        const deletes = (currentSaveId - saveId) - 1;
        if (deletes > 0) {
            await Database_1.Database.getInstance().deleteGameNbrSaves(gameId, deletes);
        }
        await this.add(game);
        game.undoCount++;
        return game;
    }
    mark(gameId) {
        this.cache.mark(gameId);
    }
    sweep() {
        this.cache.sweep();
    }
    async completeGame(game) {
        const database = Database_1.Database.getInstance();
        await database.saveGame(game);
        try {
            this.mark(game.id);
            await database.markFinished(game.id);
            await this.maintenance();
        }
        catch (err) {
            console.error(err);
        }
    }
    saveGame(game) {
        if (this.purgedGames.includes(game.id)) {
            throw new Error('This game no longer exists');
        }
        return Database_1.Database.getInstance().saveGame(game);
    }
    async maintenance() {
        const database = Database_1.Database.getInstance();
        const purgedGames = await database.purgeUnfinishedGames();
        this.purgedGames.push(...purgedGames);
        await database.compressCompletedGames();
    }
}
exports.GameLoader = GameLoader;
function parseConfigString(stringValue) {
    const options = {
        sweep: 'manual',
        evictMillis: (0, durations_1.durationToMilliseconds)('15m'),
        sleepMillis: (0, durations_1.durationToMilliseconds)('5m'),
    };
    const parsed = Object.fromEntries((stringValue ?? '').split(';').map((s) => s.split('=', 2)));
    if (parsed.sweep === 'auto' || parsed.sweep === 'manual') {
        options.sweep = parsed.sweep;
    }
    else if (parsed.sweep !== undefined) {
        throw new Error('invalid sweep option from GAME_CACHE: ' + parsed.sweep);
    }
    const evictMillis = (0, durations_1.durationToMilliseconds)(parsed.eviction_age);
    if (!isNaN(evictMillis))
        options.evictMillis = evictMillis;
    const sleepMillis = (0, durations_1.durationToMilliseconds)(parsed.sweep_freq);
    if (isNaN(sleepMillis))
        options.sleepMillis = sleepMillis;
    return options;
}
