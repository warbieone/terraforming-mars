"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalFilesystem = void 0;
const Types_1 = require("../../common/Types");
const fs_1 = require("fs");
const path = require('path');
const defaultDbFolder = path.resolve(process.cwd(), './db/files');
class LocalFilesystem {
    constructor(dbFolder = defaultDbFolder) {
        this.dbFolder = dbFolder;
        this.historyFolder = path.resolve(dbFolder, 'history');
        this.completedFolder = path.resolve(dbFolder, 'completed');
    }
    initialize() {
        console.log(`Starting local database at ${this.dbFolder}`);
        if (!(0, fs_1.existsSync)(this.dbFolder)) {
            (0, fs_1.mkdirSync)(this.dbFolder);
        }
        if (!(0, fs_1.existsSync)(this.historyFolder)) {
            (0, fs_1.mkdirSync)(this.historyFolder);
        }
        if (!(0, fs_1.existsSync)(this.completedFolder)) {
            (0, fs_1.mkdirSync)(this.completedFolder);
        }
        return Promise.resolve();
    }
    filename(gameId) {
        return path.resolve(this.dbFolder, `${gameId}.json`);
    }
    historyFilename(gameId, saveId) {
        const saveIdString = saveId.toString().padStart(5, '0');
        return path.resolve(this.historyFolder, `${gameId}-${saveIdString}.json`);
    }
    completedFilename(gameId) {
        return path.resolve(this.completedFolder, `${gameId}.json`);
    }
    saveGame(game) {
        console.log(`saving ${game.id} at position ${game.lastSaveId}`);
        this.saveSerializedGame(game.serialize());
        game.lastSaveId++;
        return Promise.resolve();
    }
    saveSerializedGame(serializedGame) {
        const text = JSON.stringify(serializedGame, null, 2);
        (0, fs_1.writeFileSync)(this.filename(serializedGame.id), text);
        (0, fs_1.writeFileSync)(this.historyFilename(serializedGame.id, serializedGame.lastSaveId), text);
    }
    getGame(gameId) {
        try {
            console.log(`Loading ${gameId}`);
            const text = (0, fs_1.readFileSync)(this.filename(gameId));
            const serializedGame = JSON.parse(text.toString());
            return Promise.resolve(serializedGame);
        }
        catch (e) {
            const error = e instanceof Error ? e : new Error(String(e));
            throw error;
        }
    }
    async getGameId(participantId) {
        const participants = await this.getParticipants();
        for (const entry of participants) {
            if (entry.participantIds.includes(participantId)) {
                return entry.gameId;
            }
        }
        throw new Error(`participant id ${participantId} not found`);
    }
    getSaveIds(gameId) {
        const results = [];
        const entries = (0, fs_1.readdirSync)(this.historyFolder, { withFileTypes: true });
        for (const dirent of entries) {
            if (dirent.name.startsWith(gameId + '-') && dirent.isFile()) {
                const match = dirent.name.match(/(.*)-(.*).json/);
                if (match !== null) {
                    const saveIdAsString = match[2];
                    results.push(Number(saveIdAsString));
                }
            }
        }
        return Promise.resolve(results);
    }
    getGameVersion(gameId, saveId) {
        try {
            console.log(`Loading ${gameId} at ${saveId}`);
            const text = (0, fs_1.readFileSync)(this.historyFilename(gameId, saveId));
            const serializedGame = JSON.parse(text.toString());
            return Promise.resolve(serializedGame);
        }
        catch (e) {
            console.log(e);
            return Promise.reject(new Error(`Game ${gameId} not found at save_id ${saveId}`));
        }
    }
    async getPlayerCount(gameId) {
        const gameIds = await this.getGameIds();
        const found = gameIds.find((gId) => gId === gameId && (0, fs_1.existsSync)(this.historyFilename(gameId, 0)));
        if (found === undefined) {
            throw new Error(`${gameId} not found`);
        }
        const text = (0, fs_1.readFileSync)(this.historyFilename(gameId, 0));
        const serializedGame = JSON.parse(text.toString());
        return serializedGame.players.length;
    }
    getGameIds() {
        const gameIds = [];
        (0, fs_1.readdirSync)(this.dbFolder, { withFileTypes: true }).forEach((dirent) => {
            const gameId = this.asGameId(dirent);
            if (gameId !== undefined) {
                gameIds.push(gameId);
            }
        });
        return Promise.resolve(gameIds);
    }
    saveGameResults(gameId, players, generations, gameOptions, scores) {
        const obj = { gameId, players, generations, gameOptions, scores };
        const text = JSON.stringify(obj, null, 2);
        (0, fs_1.writeFileSync)(this.completedFilename(gameId), text);
    }
    markFinished(_gameId) {
        return Promise.resolve();
    }
    purgeUnfinishedGames() {
        return Promise.resolve([]);
    }
    compressCompletedGames() {
        return Promise.resolve();
    }
    deleteGameNbrSaves(gameId, rollbackCount) {
        if (rollbackCount <= 0) {
            console.error(`invalid rollback count for ${gameId}: ${rollbackCount}`);
            return Promise.resolve();
        }
        return this.getSaveIds(gameId).then((saveIds) => {
            const versionsToDelete = saveIds.slice(-rollbackCount);
            for (const version of versionsToDelete) {
                this.deleteVersion(gameId, version);
            }
            return undefined;
        });
    }
    stats() {
        return Promise.resolve({
            type: 'Local Filesystem',
            path: this.dbFolder.toString(),
            history_path: this.historyFolder.toString(),
        });
    }
    storeParticipants(_entry) {
        return Promise.resolve();
    }
    asGameId(dirent) {
        if (!dirent.isFile())
            return undefined;
        const re = /(.*).json/;
        const result = dirent.name.match(re);
        if (result === null)
            return undefined;
        return (0, Types_1.isGameId)(result[1]) ? result[1] : undefined;
    }
    getParticipants() {
        const gameIds = [];
        (0, fs_1.readdirSync)(this.dbFolder, { withFileTypes: true }).forEach((dirent) => {
            const gameId = this.asGameId(dirent);
            if (gameId !== undefined) {
                try {
                    const text = (0, fs_1.readFileSync)(this.filename(gameId));
                    const game = JSON.parse(text.toString());
                    const participantIds = game.players.map((p) => p.id);
                    if (game.spectatorId)
                        participantIds.push(game.spectatorId);
                    gameIds.push({ gameId, participantIds });
                }
                catch (e) {
                    console.error(`While reading ${gameId} `, e);
                }
            }
        });
        return Promise.resolve(gameIds);
    }
    deleteVersion(gameId, version) {
        (0, fs_1.unlinkSync)(this.historyFilename(gameId, version));
    }
}
exports.LocalFilesystem = LocalFilesystem;
