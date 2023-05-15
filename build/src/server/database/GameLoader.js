"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        (0, timer_1.timeAsync)(this.cache.load())
            .then((v) => {
            metrics.initialize.set(v.duration);
        });
    }
    static getInstance() {
        var _a;
        if (GameLoader.instance === undefined) {
            const config = parseConfigString((_a = process.env.GAME_CACHE) !== null && _a !== void 0 ? _a : '');
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
    add(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield this.cache.getGames();
            d.games.set(game.id, game);
            if (game.spectatorId !== undefined) {
                d.participantIds.set(game.spectatorId, game.id);
            }
            for (const player of game.getPlayers()) {
                d.participantIds.set(player.id, game.id);
            }
        });
    }
    getIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield this.cache.getGames();
            const map = new mnemonist_1.MultiMap();
            d.participantIds.forEach((gameId, participantId) => map.set(gameId, participantId));
            const arry = Array.from(map.associations());
            return arry.map(([gameId, participantIds]) => ({ gameId, participantIds }));
        });
    }
    isCached(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield this.cache.getGames();
            return d.games.get(gameId) !== undefined;
        });
    }
    getGame(id, forceLoad = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = yield this.cache.getGames();
            const gameId = (0, Types_1.isGameId)(id) ? id : d.participantIds.get(id);
            if (gameId === undefined)
                return undefined;
            if (forceLoad === false && d.games.get(gameId) !== undefined)
                return d.games.get(gameId);
            if (d.games.has(gameId)) {
                try {
                    const serializedGame = yield Database_1.Database.getInstance().getGame(gameId);
                    if (serializedGame === undefined) {
                        console.error(`GameLoader:loadGame: game ${gameId} not found`);
                        return undefined;
                    }
                    const game = Game_1.Game.deserialize(serializedGame);
                    yield this.add(game);
                    console.log(`GameLoader loaded game ${gameId} into memory from database`);
                    return game;
                }
                catch (e) {
                    console.error('GameLoader:loadGame', e);
                    return undefined;
                }
            }
            return undefined;
        });
    }
    restoreGameAt(gameId, saveId) {
        return __awaiter(this, void 0, void 0, function* () {
            const current = yield this.getGame(gameId);
            if (current === undefined) {
                throw new Error('Cannot find game');
            }
            const currentSaveId = current.lastSaveId;
            const serializedGame = yield Database_1.Database.getInstance().getGameVersion(gameId, saveId);
            const game = Game_1.Game.deserialize(serializedGame);
            const deletes = (currentSaveId - saveId) - 1;
            if (deletes > 0) {
                yield Database_1.Database.getInstance().deleteGameNbrSaves(gameId, deletes);
            }
            yield this.add(game);
            game.undoCount++;
            return game;
        });
    }
    mark(gameId) {
        this.cache.mark(gameId);
    }
    sweep() {
        this.cache.sweep();
    }
}
exports.GameLoader = GameLoader;
function parseConfigString(stringValue) {
    const options = {
        sweep: 'manual',
        evictMillis: (0, durations_1.durationToMilliseconds)('15m'),
        sleepMillis: (0, durations_1.durationToMilliseconds)('5m'),
    };
    const parsed = Object.fromEntries((stringValue !== null && stringValue !== void 0 ? stringValue : '').split(';').map((s) => s.split('=', 2)));
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
//# sourceMappingURL=GameLoader.js.map