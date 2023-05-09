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
const Types_1 = require("../../common/Types");
const Database_1 = require("../database/Database");
const LocalFilesystem_1 = require("../database/LocalFilesystem");
const args = process.argv.slice(2);
const id = args[0];
if (id === undefined) {
    throw new Error('missing game id');
}
if (process.env.LOCAL_FS_DB !== undefined) {
    throw new Error('Do not run exportGame on local filesystem. Just access the files themselves');
}
const db = Database_1.Database.getInstance();
const localDb = new LocalFilesystem_1.LocalFilesystem();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((0, Types_1.isPlayerId)(id) || (0, Types_1.isSpectatorId)(id)) {
            console.log(`Finding game for player/spectator ${id}`);
            const gameId = yield db.getGameId(id);
            if (gameId === undefined) {
                console.log('Game is undefined');
                process.exit(1);
            }
            yield load(gameId);
        }
    });
}
if ((0, Types_1.isGameId)(id)) {
    load(id);
}
function load(gameId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Loading game ${gameId}`);
        const game = yield db.getGame(gameId);
        console.log(`Last version is ${game.lastSaveId}`);
        let errors = 0;
        let writes = 0;
        const saveIds = yield db.getSaveIds(gameId);
        for (const saveId of saveIds) {
            try {
                const serialized = yield db.getGameVersion(gameId, saveId);
                console.log(`Storing version ${saveId}`);
                localDb.saveSerializedGame(serialized);
                writes++;
            }
            catch (err) {
                console.log(`failed to process saveId ${saveId}: ${err}`);
                errors++;
            }
        }
        console.log(`Wrote ${writes} records and had ${errors} failures.`);
        console.log(`id: ${gameId}`);
    });
}
main();
