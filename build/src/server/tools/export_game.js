"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ansi = require("ansi-escape-sequences");
const fs_1 = require("fs");
const Types_1 = require("../../common/Types");
const Database_1 = require("../database/Database");
const LocalFilesystem_1 = require("../database/LocalFilesystem");
const exportLogs_1 = require("./exportLogs");
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
LocalFilesystem_1.LocalFilesystem.quiet = true;
async function getGameId(id) {
    if ((0, Types_1.isGameId)(id)) {
        return id;
    }
    if ((0, Types_1.isPlayerId)(id) || (0, Types_1.isSpectatorId)(id)) {
        console.log(`Finding game for player/spectator ${id}`);
        return await db.getGameId(id);
    }
    return undefined;
}
async function main() {
    await db.initialize();
    const gameId = await getGameId(id);
    if (gameId === undefined) {
        console.log('Game is undefined');
        process.exit(1);
    }
    await load(gameId);
}
function showProgressBar(current, total, width = process.stdout.columns ?? 40) {
    const bar = '█';
    const emptyBar = ' ';
    width = width - 10;
    const filledLength = Math.floor((current / total) * width);
    const emptyLength = width - filledLength;
    const progressString = bar.repeat(filledLength) + emptyBar.repeat(emptyLength);
    const percentage = Math.round((current / total) * 100);
    const ansiEscapeCode = `${ansi.cursor.horizontalAbsolute(0)}${progressString} ${percentage}% ${current}`;
    process.stdout.write(ansiEscapeCode);
}
async function load(gameId) {
    await localDb.initialize();
    console.log(`Loading game ${gameId}`);
    const game = await db.getGame(gameId);
    console.log(`Last version is ${game.lastSaveId}`);
    let errors = 0;
    let writes = 0;
    const saveIds = await db.getSaveIds(gameId);
    for (const saveId of saveIds) {
        try {
            const serialized = await db.getGameVersion(gameId, saveId);
            showProgressBar(saveId, game.lastSaveId);
            localDb.saveSerializedGame(serialized);
            writes++;
        }
        catch (err) {
            console.log(`failed to process saveId ${saveId}: ${err}`);
            errors++;
        }
    }
    console.log();
    try {
        (0, fs_1.mkdirSync)('logs');
    }
    catch (_) {
    }
    const logs = await (0, exportLogs_1.exportLogs)(localDb, gameId);
    const logFilename = `logs/${gameId}.log`;
    (0, fs_1.writeFileSync)(logFilename, logs.join('\n'));
    console.log(`Log at ${logFilename}`);
    console.log(`Wrote ${writes} records and had ${errors} failures.`);
    console.log(`id: ${gameId}`);
}
main();
