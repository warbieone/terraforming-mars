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
    getInstance(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.db.getGame(gameId);
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
        });
    }
    getAllInstances(allGameIds) {
        return __awaiter(this, void 0, void 0, function* () {
            metrics.start.set(this.clock.now());
            const sliceSize = 1000;
            for (let i = 0; i < allGameIds.length; i += sliceSize) {
                const slice = allGameIds.slice(i, i + sliceSize);
                yield Promise.all(slice.map((x) => this.getInstance(x))).then(() => {
                    console.log(`Loaded ${i} to ${i + slice.length} of ${allGameIds.length}`);
                });
            }
            metrics.end.set(this.clock.now());
        });
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Preloading IDs.');
                const entries = yield this.db.getParticipants();
                for (const entry of entries) {
                    const gameId = entry.gameId;
                    if (this.games.get(gameId) === undefined) {
                        this.games.set(gameId, undefined);
                        entry.participantIds.forEach((participant) => this.participantIds.set(participant, gameId));
                    }
                }
                console.log(`Preloaded ${entries.length} IDs.`);
                const allGameIds = yield this.db.getGameIds();
                const filtered = allGameIds.filter((id) => !this.games.has(id));
                yield this.getAllInstances(filtered);
            }
            catch (err) {
                console.error('error loading all games', err);
            }
            this.loaded = true;
            this.emit('loaded');
            if (this.config.sweep === 'auto') {
                scheduleSweep(this, this.config.sleepMillis);
            }
        });
    }
    getGames() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loaded) {
                yield (0, events_1.once)(this, 'loaded');
            }
            return { games: this.games, participantIds: this.participantIds };
        });
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
