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
exports.SQLite = exports.IN_MEMORY_SQLITE_PATH = void 0;
const fs = require("fs");
const path = require("path");
const utils_1 = require("./utils");
const mnemonist_1 = require("mnemonist");
exports.IN_MEMORY_SQLITE_PATH = ':memory:';
class SQLite {
    get db() {
        if (this._db === undefined) {
            throw new Error('attempt to get db before initialize');
        }
        return this._db;
    }
    constructor(filename = undefined, throwQuietFailures = false) {
        this.filename = filename;
        this.throwQuietFailures = throwQuietFailures;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const { Database } = yield Promise.resolve().then(() => require('sqlite3'));
            const dbFolder = path.resolve(process.cwd(), './db');
            const dbPath = path.resolve(dbFolder, 'game.db');
            if (this.filename === undefined) {
                this.filename = dbPath;
            }
            if (this.filename !== exports.IN_MEMORY_SQLITE_PATH) {
                if (!fs.existsSync(dbFolder)) {
                    fs.mkdirSync(dbFolder);
                }
            }
            this._db = new Database(String(this.filename));
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS games(game_id varchar, players integer, save_id integer, game text, status text default \'running\', created_time timestamp default (strftime(\'%s\', \'now\')), PRIMARY KEY (game_id, save_id))');
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS participants(game_id varchar, participant varchar, PRIMARY KEY (game_id, participant))');
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS game_results(game_id varchar not null, seed_game_id varchar, players integer, generations integer, game_options text, scores text, PRIMARY KEY (game_id))');
            yield this.asyncRun(`CREATE TABLE IF NOT EXISTS completed_game(
      game_id varchar not null,
      completed_time timestamp not null default (strftime('%s', 'now')),
      PRIMARY KEY (game_id))`);
            yield this.asyncRun('DROP TABLE IF EXISTS purges');
        });
    }
    getPlayerCount(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT players FROM games WHERE save_id = 0 AND game_id = ? LIMIT 1';
            const row = yield this.asyncGet(sql, [gameId]);
            if (row === undefined) {
                throw new Error(`bad game id ${gameId}`);
            }
            return row.players;
        });
    }
    getGameIds() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT distinct game_id game_id FROM games';
            const rows = yield this.asyncAll(sql, []);
            return rows.map((row) => row.game_id);
        });
    }
    saveGameResults(gameId, players, generations, gameOptions, scores) {
        this.db.run('INSERT INTO game_results (game_id, seed_game_id, players, generations, game_options, scores) VALUES($1, $2, $3, $4, $5, $6)', [gameId, gameOptions.clonedGamedId, players, generations, JSON.stringify(gameOptions), JSON.stringify(scores)], (err) => {
            if (err) {
                console.error('SQLite:saveGameResults', err);
                throw err;
            }
        });
    }
    getGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.asyncGet('SELECT game game FROM games WHERE game_id = ? ORDER BY save_id DESC LIMIT 1', [gameId]);
            if (row === undefined) {
                throw new Error(`bad game id ${gameId}`);
            }
            return JSON.parse(row.game);
        });
    }
    getGameId(participantId) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = 'SELECT game_id from games, json_each(games.game, \'$.players\') e where json_extract(e.value, \'$.id\') = ?';
            if (participantId.charAt(0) === 's') {
                sql = 'SELECT game_id from games where json_extract(games.game, \'$.spectatorId\') = ?';
            }
            else if (participantId.charAt(0) !== 'p') {
                throw new Error(`id ${participantId} is neither a player id or spectator id`);
            }
            const row = yield this.asyncGet(sql, [participantId]);
            if (row === undefined) {
                throw new Error(`No game id found for participant id ${participantId}`);
            }
            return row.game_id;
        });
    }
    getSaveIds(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.asyncAll('SELECT distinct save_id FROM games WHERE game_id = ?', [gameId]);
            return rows.map((row) => row.save_id);
        });
    }
    getGameVersion(gameId, saveId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT game_id, game FROM games WHERE game_id = ? and save_id = ?';
            const row = yield this.asyncGet(sql, [gameId, saveId]);
            if (row === undefined || row.game_id === undefined || row.game === undefined) {
                throw new Error(`Game ${gameId} not found`);
            }
            return JSON.parse(row.game);
        });
    }
    getMaxSaveId(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const row = yield this.asyncGet('SELECT MAX(save_id) AS save_id FROM games WHERE game_id = ?', [gameId]);
            if (row === undefined) {
                throw new Error(`bad game id ${gameId}`);
            }
            return row.save_id;
        });
    }
    markFinished(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise1 = this.asyncRun('INSERT into completed_game (game_id) values (?)', [gameId]);
            const promise2 = this.asyncRun('UPDATE games SET status = \'finished\' WHERE game_id = ?', [gameId]);
            yield Promise.all([promise1, promise2]);
        });
    }
    purgeUnfinishedGames(maxGameDays = process.env.MAX_GAME_DAYS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxGameDays !== undefined) {
                const dateToSeconds = (0, utils_1.daysAgoToSeconds)(maxGameDays, 0);
                const selectResult = yield this.asyncAll('SELECT DISTINCT game_id game_id FROM games WHERE created_time < ? and status = \'running\'', [dateToSeconds]);
                let gameIds = selectResult.map((row) => row.game_id);
                if (gameIds.length > 1000) {
                    console.log('Truncated purge to 1000 games.');
                    gameIds = gameIds.slice(0, 1000);
                }
                else {
                    console.log(`${gameIds.length} games to be purged.`);
                }
                if (gameIds.length > 0) {
                    console.log(`About to purge ${gameIds.length} games`);
                    const placeholders = gameIds.map(() => '?').join(', ');
                    const deleteResult = yield this.asyncRun(`DELETE FROM games WHERE game_id in ( ${placeholders} )`, [...gameIds]);
                    console.log(`Purged ${deleteResult.changes} rows from games`);
                    const deleteParticipantsResult = yield this.asyncRun(`DELETE FROM participants WHERE game_id in ( ${placeholders} )`, [...gameIds]);
                    console.log(`Purged ${deleteParticipantsResult.changes} rows from participants`);
                }
                return gameIds;
            }
            else {
                return Promise.resolve([]);
            }
        });
    }
    compressCompletedGames(compressCompletedGamesDays = process.env.COMPRESS_COMPLETED_GAMES_DAYS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (compressCompletedGamesDays === undefined) {
                return;
            }
            const dateToSeconds = (0, utils_1.daysAgoToSeconds)(compressCompletedGamesDays, 0);
            const selectResult = yield this.asyncAll('SELECT DISTINCT game_id FROM completed_game WHERE completed_time < ?', [dateToSeconds]);
            const gameIds = selectResult.map((row) => row.game_id);
            console.log(`${gameIds.length} completed games to be compressed.`);
            if (gameIds.length > 1000) {
                gameIds.length = 1000;
                console.log('Compressing 1000 games.');
            }
            for (const gameId of gameIds) {
                this.compressCompletedGame(gameId);
            }
        });
    }
    compressCompletedGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const maxSaveId = yield this.getMaxSaveId(gameId);
            return this.asyncRun('DELETE FROM games WHERE game_id = ? AND save_id < ? AND save_id > 0', [gameId, maxSaveId])
                .then(() => {
                return this.asyncRun('DELETE FROM completed_games where game_id = ?', [gameId]);
            });
        });
    }
    saveGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameJSON = game.toJSON();
            yield this.runQuietly('INSERT INTO games (game_id, save_id, game, players) VALUES (?, ?, ?, ?) ON CONFLICT (game_id, save_id) DO UPDATE SET game = ?', [game.id, game.lastSaveId, gameJSON, game.getPlayers().length, gameJSON]);
            if (game.lastSaveId === 0) {
                const participantIds = game.getPlayers().map((p) => p.id);
                if (game.spectatorId)
                    participantIds.push(game.spectatorId);
                try {
                    yield this.storeParticipants({ gameId: game.id, participantIds: participantIds });
                }
                catch (e) {
                    console.error(e);
                }
            }
            game.lastSaveId++;
        });
    }
    deleteGameNbrSaves(gameId, rollbackCount) {
        if (rollbackCount <= 0) {
            console.error(`invalid rollback count for ${gameId}: ${rollbackCount}`);
            return Promise.resolve();
        }
        return this.runQuietly('DELETE FROM games WHERE rowid IN (SELECT rowid FROM games WHERE game_id = ? ORDER BY save_id DESC LIMIT ?)', [gameId, rollbackCount]);
    }
    stats() {
        const size = this.filename === exports.IN_MEMORY_SQLITE_PATH ? -1 : fs.statSync(String(this.filename)).size;
        return Promise.resolve({
            type: 'SQLite',
            path: String(this.filename),
            size_bytes: size,
        });
    }
    storeParticipants(entry) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeholders = entry.participantIds.map(() => '(?, ?)').join(', ');
            const values = entry.participantIds.map((participant) => [entry.gameId, participant]).flat();
            yield this.asyncRun('INSERT INTO participants (game_id, participant) VALUES ' + placeholders, values);
        });
    }
    getParticipants() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.asyncAll('SELECT game_id, participant FROM participants');
            const multimap = new mnemonist_1.MultiMap();
            rows.forEach((row) => multimap.set(row.game_id, row.participant));
            const result = [];
            multimap.forEachAssociation((participantIds, gameId) => {
                result.push({ gameId, participantIds });
            });
            return result;
        });
    }
    asyncRun(sql, params) {
        return new Promise((resolve, reject) => {
            function cb(err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(this);
                }
            }
            if (params !== undefined) {
                this.db.run(sql, params, cb);
            }
            else {
                this.db.run(sql, cb);
            }
        });
    }
    asyncGet(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, function (err, row) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(row);
                }
            });
        });
    }
    asyncAll(sql, params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, function (err, rows) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows);
                }
            });
        });
    }
    runQuietly(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.asyncRun(sql, params);
            }
            catch (err) {
                console.error(err);
                console.error('for sql: ' + sql);
                if (this.throwQuietFailures) {
                    throw err;
                }
            }
        });
    }
}
exports.SQLite = SQLite;
//# sourceMappingURL=SQLite.js.map