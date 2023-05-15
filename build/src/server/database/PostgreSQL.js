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
exports.PostgreSQL = void 0;
const pg_1 = require("pg");
const utils_1 = require("./utils");
class PostgreSQL {
    constructor(config = {
        connectionString: process.env.POSTGRES_HOST,
    }) {
        var _a;
        this.databaseName = undefined;
        this.statistics = {
            saveCount: 0,
            saveErrorCount: 0,
            saveConflictUndoCount: 0,
            saveConflictNormalCount: 0,
        };
        if ((_a = config.connectionString) === null || _a === void 0 ? void 0 : _a.startsWith('postgres')) {
            config.ssl = {
                rejectUnauthorized: false,
            };
        }
        if (config.database) {
            this.databaseName = config.database;
        }
        else if (config.connectionString) {
            try {
                this.databaseName = new URL(config.connectionString).pathname.replace(/^\//, '');
            }
            catch (e) {
                console.log(e);
            }
        }
        this.client = new pg_1.Pool(config);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query('CREATE TABLE IF NOT EXISTS games(game_id varchar, players integer, save_id integer, game text, status text default \'running\', created_time timestamp default now(), PRIMARY KEY (game_id, save_id))');
            yield this.client.query('CREATE TABLE IF NOT EXISTS participants(game_id varchar, participants varchar[], PRIMARY KEY (game_id))');
            yield this.client.query('CREATE TABLE IF NOT EXISTS game_results(game_id varchar not null, seed_game_id varchar, players integer, generations integer, game_options text, scores text, PRIMARY KEY (game_id))');
            yield this.client.query('CREATE INDEX IF NOT EXISTS games_i1 on games(save_id)');
            yield this.client.query('CREATE INDEX IF NOT EXISTS games_i2 on games(created_time)');
            yield this.client.query('CREATE INDEX IF NOT EXISTS participants_idx_ids on participants USING GIN (participants)');
        });
    }
    getPlayerCount(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT players FROM games WHERE save_id = 0 AND game_id = $1 LIMIT 1';
            const res = yield this.client.query(sql, [gameId]);
            if (res.rows.length === 0) {
                throw new Error(`no rows found for game id ${gameId}`);
            }
            return res.rows[0].players;
        });
    }
    getGameIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT games.game_id
    FROM games, (
      SELECT max(save_id) save_id, game_id
      FROM games
      GROUP BY game_id) a
    WHERE games.game_id = a.game_id
    AND games.save_id = a.save_id
    ORDER BY created_time DESC`;
            const res = yield this.client.query(sql);
            return res.rows.map((row) => row.game_id);
        });
    }
    loadCloneableGame(gameId) {
        return this.getGameVersion(gameId, 0);
    }
    getGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query('SELECT game game FROM games WHERE game_id = $1 ORDER BY save_id DESC LIMIT 1', [gameId]);
            if (res.rows.length === 0 || res.rows[0] === undefined) {
                throw new Error(`Game ${gameId} not found`);
            }
            const json = JSON.parse(res.rows[0].game);
            return json;
        });
    }
    getGameId(participantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.client.query('select game_id from participants where $1 = ANY(participants)', [participantId]);
                if (res.rowCount === 0) {
                    throw new Error(`Game for player id ${participantId} not found`);
                }
                return res.rows[0].game_id;
            }
            catch (err) {
                console.error('PostgreSQL:getGameId', err);
                throw err;
            }
        });
    }
    getSaveIds(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query('SELECT distinct save_id FROM games WHERE game_id = $1', [gameId]);
            const allSaveIds = [];
            res.rows.forEach((row) => {
                allSaveIds.push(row.save_id);
            });
            return Promise.resolve(allSaveIds);
        });
    }
    getGameVersion(gameId, saveId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query('SELECT game game FROM games WHERE game_id = $1 and save_id = $2', [gameId, saveId]);
            if (res.rowCount === 0) {
                throw new Error(`Game ${gameId} not found at save_id ${saveId}`);
            }
            return JSON.parse(res.rows[0].game);
        });
    }
    saveGameResults(gameId, players, generations, gameOptions, scores) {
        this.client.query('INSERT INTO game_results (game_id, seed_game_id, players, generations, game_options, scores) VALUES($1, $2, $3, $4, $5, $6)', [gameId, gameOptions.clonedGamedId, players, generations, gameOptions, JSON.stringify(scores)], (err) => {
            if (err) {
                console.error('PostgreSQL:saveGameResults', err);
                throw err;
            }
        });
    }
    getMaxSaveId(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query('SELECT MAX(save_id) as save_id FROM games WHERE game_id = $1', [gameId]);
            return res.rows[0].save_id;
        });
    }
    throwIf(err, condition) {
        if (err) {
            console.error('PostgreSQL', condition, err);
            throw err;
        }
    }
    cleanGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxSaveId = yield this.getMaxSaveId(gameId);
            const delete1 = this.client.query('DELETE FROM games WHERE game_id = $1 AND save_id < $2 AND save_id > 0', [gameId, maxSaveId]);
            const delete2 = this.client.query('UPDATE games SET status = \'finished\' WHERE game_id = $1', [gameId]);
            const delete3 = this.purgeUnfinishedGames();
            yield Promise.all([delete1, delete2, delete3]);
        });
    }
    purgeUnfinishedGames(maxGameDays = process.env.MAX_GAME_DAYS) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateToSeconds = (0, utils_1.daysAgoToSeconds)(maxGameDays, 10);
            const selectResult = yield this.client.query('SELECT DISTINCT game_id FROM games WHERE created_time < to_timestamp($1)', [dateToSeconds]);
            const gameIds = selectResult.rows.slice(0, 1000).map((row) => row.game_id);
            console.log(`${gameIds.length} games to be purged.`);
            if (gameIds.length > 1000) {
                gameIds.length = 1000;
                console.log('Truncated purge to 1000 games.');
            }
            const deleteGamesResult = yield this.client.query('DELETE FROM games WHERE game_id = ANY($1)', [gameIds]);
            console.log(`Purged ${deleteGamesResult.rowCount} rows from games`);
            const deleteParticipantsResult = yield this.client.query('DELETE FROM participants WHERE game_id = ANY($1)', [gameIds]);
            console.log(`Purged ${deleteParticipantsResult.rowCount} rows from participants`);
        });
    }
    saveGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameJSON = game.toJSON();
            this.statistics.saveCount++;
            if (game.gameOptions.undoOption)
                logForUndo(game.id, 'start save', game.lastSaveId);
            try {
                const thisSaveId = game.lastSaveId;
                const res = yield this.client.query(`INSERT INTO games (game_id, save_id, game, players)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (game_id, save_id) DO UPDATE SET game = $3
        RETURNING (xmax = 0) AS inserted`, [game.id, game.lastSaveId, gameJSON, game.getPlayers().length]);
                game.lastSaveId = thisSaveId + 1;
                let inserted = true;
                try {
                    inserted = res.rows[0].inserted;
                }
                catch (err) {
                    console.error(err);
                }
                if (inserted === false) {
                    if (game.gameOptions.undoOption) {
                        this.statistics.saveConflictUndoCount++;
                    }
                    else {
                        this.statistics.saveConflictNormalCount++;
                    }
                }
                if (inserted === true && thisSaveId === 0) {
                    const participantIds = game.getPlayers().map((p) => p.id);
                    if (game.spectatorId)
                        participantIds.push(game.spectatorId);
                    yield this.storeParticipants({ gameId: game.id, participantIds: participantIds });
                }
                if (game.gameOptions.undoOption)
                    logForUndo(game.id, 'increment save id, now', game.lastSaveId);
            }
            catch (err) {
                this.statistics.saveErrorCount++;
                console.error('PostgreSQL:saveGame', err);
            }
        });
    }
    deleteGameNbrSaves(gameId, rollbackCount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (rollbackCount <= 0) {
                console.error(`invalid rollback count for ${gameId}: ${rollbackCount}`);
                return;
            }
            logForUndo(gameId, 'deleting', rollbackCount, 'saves');
            const first = yield this.getSaveIds(gameId);
            const res = yield this.client.query('DELETE FROM games WHERE ctid IN (SELECT ctid FROM games WHERE game_id = $1 ORDER BY save_id DESC LIMIT $2)', [gameId, rollbackCount]);
            logForUndo(gameId, 'deleted', res === null || res === void 0 ? void 0 : res.rowCount, 'rows');
            const second = yield this.getSaveIds(gameId);
            const difference = first.filter((x) => !second.includes(x));
            logForUndo(gameId, 'second', second);
            logForUndo(gameId, 'Rollback difference', difference);
        });
    }
    storeParticipants(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query('INSERT INTO participants (game_id, participants) VALUES($1, $2)', [entry.gameId, entry.participantIds]);
        });
    }
    getParticipants() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.client.query('select game_id, participants from participants');
            return res.rows.map((row) => {
                return { gameId: row.game_id, participantIds: row.participants };
            });
        });
    }
    stats() {
        return __awaiter(this, void 0, void 0, function* () {
            const map = {
                'type': 'POSTGRESQL',
                'pool-total-count': this.client.totalCount,
                'pool-idle-count': this.client.idleCount,
                'pool-waiting-count': this.client.waitingCount,
                'save-count': this.statistics.saveCount,
                'save-error-count': this.statistics.saveErrorCount,
                'save-conflict-normal-count': this.statistics.saveConflictNormalCount,
                'save-conflict-undo-count': this.statistics.saveConflictUndoCount,
            };
            const dbsizes = yield this.client.query(`
    SELECT
      pg_size_pretty(pg_total_relation_size('games')) as game_size,
      pg_size_pretty(pg_total_relation_size('game_results')) as game_results_size,
      pg_size_pretty(pg_total_relation_size('participants')) as participants_size,
      pg_size_pretty(pg_database_size($1)) as db_size
    `, [this.databaseName]);
            map['size-bytes-games'] = dbsizes.rows[0].game_size;
            map['size-bytes-game-results'] = dbsizes.rows[0].game_results_size;
            map['size-bytes-participants'] = dbsizes.rows[0].participants_size;
            map['size-bytes-database'] = dbsizes.rows[0].db_size;
            for (const table of ['games', 'game_results', 'participants']) {
                const result = yield this.client.query('select count(*) as rowcount from ' + table);
                map['rows-' + table] = result.rows[0].rowcount;
            }
            return map;
        });
    }
}
exports.PostgreSQL = PostgreSQL;
function logForUndo(gameId, ...message) {
    console.error(['TRACKING:', gameId, ...message]);
}
//# sourceMappingURL=PostgreSQL.js.map