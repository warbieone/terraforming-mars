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
const sqlite3 = require("sqlite3");
const utils_1 = require("./utils");
const mnemonist_1 = require("mnemonist");
const path = require('path');
const fs = require('fs');
const dbFolder = path.resolve(process.cwd(), './db');
const dbPath = path.resolve(dbFolder, 'game.db');
exports.IN_MEMORY_SQLITE_PATH = ':memory:';
class SQLite {
    constructor(filename = dbPath, throwQuietFailures = false) {
        this.filename = filename;
        this.throwQuietFailures = throwQuietFailures;
        if (filename !== exports.IN_MEMORY_SQLITE_PATH) {
            if (!fs.existsSync(dbFolder)) {
                fs.mkdirSync(dbFolder);
            }
        }
        this.db = new sqlite3.Database(filename);
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS games(game_id varchar, players integer, save_id integer, game text, status text default \'running\', created_time timestamp default (strftime(\'%s\', \'now\')), PRIMARY KEY (game_id, save_id))');
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS participants(game_id varchar, participant varchar, PRIMARY KEY (game_id, participant))');
            yield this.asyncRun('CREATE TABLE IF NOT EXISTS game_results(game_id varchar not null, seed_game_id varchar, players integer, generations integer, game_options text, scores text, PRIMARY KEY (game_id))');
            yield this.asyncRun(`CREATE TABLE IF NOT EXISTS purges(
        game_id varchar not null,
        last_save_id number not null,
        completed_time timestamp not null default (strftime('%s', 'now')),
        PRIMARY KEY (game_id))`);
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
    loadCloneableGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = 'SELECT game_id, game FROM games WHERE game_id = ? AND save_id = 0';
            const row = yield this.asyncGet(sql, [gameId]);
            if (row === undefined || row.game_id === undefined || row.game === undefined) {
                throw new Error(`Game ${gameId} not found`);
            }
            const json = JSON.parse(row.game);
            return json;
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
            const row = yield this.asyncGet('SELECT game FROM games WHERE game_id = ? and save_id = ?', [gameId, saveId]);
            if (row === undefined) {
                throw new Error(`bad game id ${gameId}`);
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
    cleanGame(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saveId = yield this.getMaxSaveId(gameId);
                yield this.asyncRun('INSERT into purges (game_id, last_save_id) values (?, ?)', [gameId, saveId]);
                yield this.asyncRun('DELETE FROM games WHERE game_id = ? AND save_id < ? AND save_id > 0', [gameId, saveId]);
                yield this.asyncRun('UPDATE games SET status = \'finished\' WHERE game_id = ?', [gameId]);
                yield this.purgeUnfinishedGames();
            }
            catch (err) {
                console.error(`SQLite: cleanGame for ${gameId} ` + err);
            }
        });
    }
    purgeUnfinishedGames(maxGameDays = process.env.MAX_GAME_DAYS) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxGameDays !== undefined) {
                const dateToSeconds = (0, utils_1.daysAgoToSeconds)(maxGameDays, 0);
                const selectResult = yield this.asyncAll('SELECT distinct game_id game_id FROM games WHERE created_time < ? and status = \'running\'', [dateToSeconds]);
                const gameIds = selectResult.map((row) => row.game_id);
                if (gameIds.length > 0) {
                    console.log(`About to purge ${gameIds.length} games`);
                    const placeholders = gameIds.map(() => '?').join(', ');
                    const deleteResult = yield this.asyncRun(`DELETE FROM games WHERE game_id in ( ${placeholders} )`, [...gameIds]);
                    console.log(`Purged ${deleteResult.changes} rows from games`);
                    const deleteParticipantsResult = yield this.asyncRun(`DELETE FROM participants WHERE game_id in ( ${placeholders} )`, [...gameIds]);
                    console.log(`Purged ${deleteParticipantsResult.changes} rows from participants`);
                }
            }
            else {
                return Promise.resolve();
            }
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
        const size = this.filename === exports.IN_MEMORY_SQLITE_PATH ? -1 : fs.statSync(this.filename).size;
        return Promise.resolve({
            type: 'SQLite',
            path: this.filename,
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