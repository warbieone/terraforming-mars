"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const events_1 = require("events");
const events_2 = require("events");
const prometheus = require("prom-client");
const Database_1 = require("./Database");
const metrics = {
    start: new prometheus.Gauge({
        name: 'game_ids_get_all_instances_started',
        help: 'Time getAllInstances started',
        registers: [prometheus.register],
    }),
    end: new prometheus.Gauge({
        name: 'game_ids_get_all_instances_finished',
        help: 'Time getAllInstances finished',
        registers: [prometheus.register],
    }),
};
class Cache extends events_2.EventEmitter {
    constructor(config, clock) {
        super();
        this.loaded = false;
        this.games = new Map();
        this.participantIds = new Map();
        this.db = Database_1.Database.getInstance();
        this.evictionSchedule = new Map();
        this.config = config;
        this.clock = clock;
    }
    async getInstance(gameId) {
        let game;
        try {
            game = await this.db.getGame(gameId);
        }
        catch (e) {
            console.error(`getInstance for ${gameId}`, e);
            return;
        }
        if (this.games.get(gameId) === undefined) {
            this.games.set(gameId, undefined);
            const participantIds = [];
            if (game.spectatorId !== undefined) {
                this.participantIds.set(game.spectatorId, gameId);
                participantIds.push(game.spectatorId);
            }
            for (const player of game.players) {
                this.participantIds.set(player.id, gameId);
                participantIds.push(player.id);
            }
            try {
                this.db.storeParticipants({ gameId, participantIds });
            }
            catch (e) {
                console.log(`Failed to store ${gameId}`);
            }
        }
    }
    async getAllInstances(allGameIds) {
        metrics.start.set(this.clock.now());
        const sliceSize = 1000;
        for (let i = 0; i < allGameIds.length; i += sliceSize) {
            const slice = allGameIds.slice(i, i + sliceSize);
            await Promise.all(slice.map((x) => this.getInstance(x))).then(() => {
                console.log(`Loaded ${i} to ${i + slice.length} of ${allGameIds.length}`);
            });
        }
        metrics.end.set(this.clock.now());
    }
    async load() {
        try {
            console.log('Preloading IDs.');
            const entries = await this.db.getParticipants();
            for (const entry of entries) {
                const gameId = entry.gameId;
                if (this.games.get(gameId) === undefined) {
                    this.games.set(gameId, undefined);
                    entry.participantIds.forEach((participant) => this.participantIds.set(participant, gameId));
                }
            }
            console.log(`Preloaded ${entries.length} IDs.`);
            const allGameIds = await this.db.getGameIds();
            const filtered = allGameIds.filter((id) => !this.games.has(id));
            await this.getAllInstances(filtered);
        }
        catch (err) {
            console.error('error loading all games', err);
        }
        this.loaded = true;
        this.emit('loaded');
        if (this.config.sweep === 'auto') {
            scheduleSweep(this, this.config.sleepMillis);
        }
    }
    async getGames() {
        if (!this.loaded) {
            await (0, events_1.once)(this, 'loaded');
        }
        return { games: this.games, participantIds: this.participantIds };
    }
    mark(gameId) {
        console.log(`Marking ${gameId} to be evicted in ${this.config.evictMillis}ms`);
        this.evictionSchedule.set(gameId, this.clock.now() + this.config.evictMillis);
    }
    sweep() {
        console.log('Starting sweep');
        const now = this.clock.now();
        for (const entry of this.evictionSchedule.entries()) {
            if (entry[1] <= now) {
                const gameId = entry[0];
                console.log(`evicting ${gameId}`);
                this.evict(gameId);
                this.evictionSchedule.delete(gameId);
            }
        }
        console.log('Finished sweep');
    }
    evict(gameId) {
        const game = this.games.get(gameId);
        if (game === undefined)
            return;
        game.getPlayers().forEach((p) => p.tearDown());
        this.games.set(gameId, undefined);
    }
}
exports.Cache = Cache;
function scheduleSweep(cache, sleepMillis) {
    console.log(`Sweeper sleeping for ${sleepMillis}ms`);
    setTimeout(() => {
        try {
            cache.sweep();
        }
        catch (err) {
            console.error(err);
        }
        scheduleSweep(cache, sleepMillis);
    }, sleepMillis);
}
