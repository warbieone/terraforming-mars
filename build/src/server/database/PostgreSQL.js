"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgreSQL = exports.POSTGRESQL_TABLES = void 0;
const Types_1 = require("../../common/Types");
const utils_1 = require("./utils");
exports.POSTGRESQL_TABLES = ['game', 'games', 'game_results', 'participants', 'completed_game'];
const POSTGRES_TRIM_COUNT = (0, utils_1.stringToNumber)(process.env.POSTGRES_TRIM_COUNT, 10);
class PostgreSQL {
    get client() {
        if (this._client === undefined) {
            throw new Error('attempt to get client before intialized');
        }
        return this._client;
    }
    constructor(config = {
        connectionString: process.env.POSTGRES_HOST,
    }) {
        this.config = config;
        this.databaseName = undefined;
        this.trimCount = POSTGRES_TRIM_COUNT;
        this.statistics = {
            saveCount: 0,
            saveErrorCount: 0,
            saveConflictUndoCount: 0,
            saveConflictNormalCount: 0,
        };
        if (config.connectionString?.startsWith('postgres')) {
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
    }
    async initialize() {
        const { Pool } = await Promise.resolve().then(() => require('pg'));
        this._client = new Pool(this.config);
        const sql = `
    CREATE TABLE IF NOT EXISTS games(
      game_id varchar,
      players integer,
      save_id integer,
      game text,
      status text default 'running',
      created_time timestamp default now(),
      PRIMARY KEY (game_id, save_id));

    /* A single game, storing the log and the options. Normalizing out some of the game state. */
    CREATE TABLE IF NOT EXISTS game(
      game_id varchar NOT NULL,
      log text NOT NULL,
      options text NOT NULL,
      status text default 'running' NOT NULL,
      created_time timestamp default now() NOT NULL,
      PRIMARY KEY (game_id));

    /* A list of the players and spectator IDs, which optimizes loading unloaded for a specific player. */
    CREATE TABLE IF NOT EXISTS participants(
      game_id varchar,
      participants varchar[],
      PRIMARY KEY (game_id));

    CREATE TABLE IF NOT EXISTS game_results(
      game_id varchar not null,
      seed_game_id varchar,
      players integer,
      generations integer,
      game_options text,
      scores text,
      PRIMARY KEY (game_id));

    CREATE TABLE IF NOT EXISTS completed_game(
      game_id varchar not null,
      completed_time timestamp default now(),
      PRIMARY KEY (game_id));

    CREATE INDEX IF NOT EXISTS games_i1 on games(save_id);
    CREATE INDEX IF NOT EXISTS games_i2 on games(created_time);
    CREATE INDEX IF NOT EXISTS participants_idx_ids on participants USING GIN (participants);
    CREATE INDEX IF NOT EXISTS completed_game_idx_completed_time on completed_game(completed_time);
    `;
        await this.client.query(sql);
    }
    async getPlayerCount(gameId) {
        const sql = 'SELECT players FROM games WHERE save_id = 0 AND game_id = $1 LIMIT 1';
        const res = await this.client.query(sql, [gameId]);
        if (res.rows.length === 0) {
            throw new Error(`no rows found for game id ${gameId}`);
        }
        return res.rows[0].players;
    }
    async getGameIds() {
        const sql = `SELECT games.game_id
    FROM games, (
      SELECT max(save_id) save_id, game_id
      FROM games
      GROUP BY game_id) a
    WHERE games.game_id = a.game_id
    AND games.save_id = a.save_id
    ORDER BY created_time DESC`;
        const res = await this.client.query(sql);
        return res.rows.map((row) => row.game_id);
    }
    compose(game, log, options) {
        const stored = JSON.parse(game);
        const { logLength, ...remainder } = stored;
        if (stored.logLength !== undefined) {
            const gameLog = JSON.parse(log);
            gameLog.length = logLength;
            const gameOptions = JSON.parse(options);
            return { ...remainder, gameOptions, gameLog };
        }
        else {
            return remainder;
        }
    }
    async getGameId(participantId) {
        try {
            const res = await this.client.query('select game_id from participants where $1 = ANY(participants)', [participantId]);
            if (res.rowCount === 0) {
                throw new Error(`Game for player id ${participantId} not found`);
            }
            return res.rows[0].game_id;
        }
        catch (err) {
            console.error('PostgreSQL:getGameId', err);
            throw err;
        }
    }
    async getSaveIds(gameId) {
        const res = await this.client.query('SELECT distinct save_id FROM games WHERE game_id = $1', [gameId]);
        const allSaveIds = [];
        res.rows.forEach((row) => {
            allSaveIds.push(row.save_id);
        });
        return Promise.resolve(allSaveIds);
    }
    async getGame(gameId) {
        const res = await this.client.query(`SELECT
        games.game as game,
        game.log as log,
        game.options as options
      FROM games
      LEFT JOIN game on game.game_id = games.game_id
      WHERE games.game_id = $1
      ORDER BY save_id DESC LIMIT 1`, [gameId]);
        if (res.rows.length === 0 || res.rows[0] === undefined) {
            throw new Error(`Game ${gameId} not found`);
        }
        const row = res.rows[0];
        return this.compose(row.game, row.log, row.options);
    }
    async getGameVersion(gameId, saveId) {
        const res = await this.client.query(`SELECT
        games.game as game,
        game.log as log,
        game.options as options
      FROM games
      LEFT JOIN game on game.game_id = games.game_id
      WHERE games.game_id = $1
      AND games.save_id = $2`, [gameId, saveId]);
        if (res.rowCount === 0) {
            throw new Error(`Game ${gameId} not found at save_id ${saveId}`);
        }
        const row = res.rows[0];
        return this.compose(row.game, row.log, row.options);
    }
    saveGameResults(gameId, players, generations, gameOptions, scores) {
        this.client.query('INSERT INTO game_results (game_id, seed_game_id, players, generations, game_options, scores) VALUES($1, $2, $3, $4, $5, $6)', [gameId, gameOptions.clonedGamedId, players, generations, gameOptions, JSON.stringify(scores)], (err) => {
            if (err) {
                console.error('PostgreSQL:saveGameResults', err);
                throw err;
            }
        });
    }
    async getMaxSaveId(gameId) {
        const res = await this.client.query('SELECT MAX(save_id) as save_id FROM games WHERE game_id = $1', [gameId]);
        return res.rows[0].save_id;
    }
    throwIf(err, condition) {
        if (err) {
            console.error('PostgreSQL', condition, err);
            throw err;
        }
    }
    async markFinished(gameId) {
        const promise1 = this.client.query('UPDATE games SET status = \'finished\' WHERE game_id = $1', [gameId]);
        const promise2 = this.client.query('INSERT INTO completed_game(game_id) VALUES ($1)', [gameId]);
        await Promise.all([promise1, promise2]);
    }
    async purgeUnfinishedGames(maxGameDays = process.env.MAX_GAME_DAYS) {
        const dateToSeconds = (0, utils_1.daysAgoToSeconds)(maxGameDays, 10);
        const selectResult = await this.client.query('SELECT DISTINCT game_id FROM games WHERE created_time < to_timestamp($1)', [dateToSeconds]);
        let gameIds = selectResult.rows.map((row) => row.game_id);
        if (gameIds.length > 1000) {
            console.log('Truncated purge to 1000 games.');
            gameIds = gameIds.slice(0, 1000);
        }
        else {
            console.log(`${gameIds.length} games to be purged.`);
        }
        if (gameIds.length > 0) {
            const deleteGamesResult = await this.client.query('DELETE FROM games WHERE game_id = ANY($1)', [gameIds]);
            console.log(`Purged ${deleteGamesResult.rowCount} rows from games`);
            const deleteParticipantsResult = await this.client.query('DELETE FROM participants WHERE game_id = ANY($1)', [gameIds]);
            console.log(`Purged ${deleteParticipantsResult.rowCount} rows from participants`);
        }
        return gameIds;
    }
    async compressCompletedGames(compressCompletedGamesDays = process.env.COMPRESS_COMPLETED_GAMES_DAYS) {
        if (compressCompletedGamesDays === undefined) {
            return;
        }
        const dateToSeconds = (0, utils_1.daysAgoToSeconds)(compressCompletedGamesDays, 0);
        const selectResult = await this.client.query('SELECT DISTINCT game_id FROM completed_game WHERE completed_time < to_timestamp($1)', [dateToSeconds]);
        const gameIds = selectResult.rows.slice(0, 1000).map((row) => row.game_id);
        console.log(`${gameIds.length} completed games to be compressed.`);
        if (gameIds.length > 1000) {
            gameIds.length = 1000;
            console.log('Compressing 1000 games.');
        }
        for (const gameId of gameIds) {
            this.compressCompletedGame(gameId);
        }
    }
    async compressCompletedGame(gameId) {
        const maxSaveId = await this.getMaxSaveId(gameId);
        return this.client.query('DELETE FROM games WHERE game_id = $1 AND save_id < $2 AND save_id > 0', [gameId, maxSaveId])
            .then(() => {
            return this.client.query('DELETE FROM completed_game where game_id = $1', [gameId]);
        });
    }
    async saveGame(game) {
        const serialized = game.serialize();
        const options = JSON.stringify(serialized.gameOptions);
        const log = JSON.stringify(serialized.gameLog);
        const storedSerialized = { ...serialized, logLength: game.gameLog.length };
        storedSerialized.gameLog = [];
        storedSerialized.gameOptions = {};
        const gameJSON = JSON.stringify(storedSerialized);
        this.statistics.saveCount++;
        try {
            await this.client.query('BEGIN');
            const thisSaveId = game.lastSaveId;
            const res = await this.client.query(`INSERT INTO games (game_id, save_id, game, players)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (game_id, save_id) DO UPDATE SET game = $3
        RETURNING (xmax = 0) AS inserted`, [game.id, game.lastSaveId, gameJSON, game.getPlayers().length]);
            await this.client.query(`INSERT INTO game (game_id, log, options)
        VALUES ($1, $2, $3)
        ON CONFLICT (game_id)
        DO UPDATE SET log = $2`, [game.id, log, options]);
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
                await this.storeParticipants({ gameId: game.id, participantIds: participantIds });
            }
            await this.client.query('COMMIT');
        }
        catch (err) {
            await this.client.query('ROLLBACK');
            this.statistics.saveErrorCount++;
            console.error('PostgreSQL:saveGame', err);
        }
        this.trim(game);
    }
    async trim(game) {
        if (this.trimCount <= 0) {
            return;
        }
        if (game.lastSaveId % this.trimCount === 0) {
            const maxSaveId = game.lastSaveId - this.trimCount;
            await this.client.query('DELETE FROM games WHERE game_id = $1 AND save_id > 0 AND save_id < $2', [game.id, maxSaveId]);
        }
        return Promise.resolve();
    }
    async deleteGameNbrSaves(gameId, rollbackCount) {
        if (rollbackCount <= 0) {
            console.error(`invalid rollback count for ${gameId}: ${rollbackCount}`);
            return;
        }
        await this.client.query('DELETE FROM games WHERE ctid IN (SELECT ctid FROM games WHERE game_id = $1 ORDER BY save_id DESC LIMIT $2)', [gameId, rollbackCount]);
    }
    async storeParticipants(entry) {
        await this.client.query('INSERT INTO participants (game_id, participants) VALUES($1, $2)', [entry.gameId, entry.participantIds]);
    }
    async getParticipants() {
        const res = await this.client.query('select game_id, participants from participants');
        return res.rows.map((row) => {
            return { gameId: (0, Types_1.safeCast)(row.game_id, Types_1.isGameId), participantIds: row.participants };
        });
    }
    async stats() {
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
        const columns = exports.POSTGRESQL_TABLES.map((table_name) => `pg_size_pretty(pg_total_relation_size('${table_name}')) as ${table_name}_size`);
        const dbsizes = await this.client.query(`SELECT ${columns.join(', ')}, pg_size_pretty(pg_database_size('${this.databaseName}')) as db_size`);
        function varz(x) {
            return x.replaceAll('_', '-');
        }
        exports.POSTGRESQL_TABLES.forEach((table) => map['size-bytes-' + varz(table)] = dbsizes.rows[0][table + '_size']);
        map['size-bytes-database'] = dbsizes.rows[0].db_size;
        for (const table of exports.POSTGRESQL_TABLES) {
            const result = await this.client.query('select count(*) as rowcount from ' + table);
            map['rows-' + varz(table)] = result.rows[0].rowcount;
        }
        return map;
    }
}
exports.PostgreSQL = PostgreSQL;
