"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const events_1 = require("events");
const events_2 = require("events");
const Database_1 = require("./Database");
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
