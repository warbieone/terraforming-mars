"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const GameLoader_1 = require("../database/GameLoader");
const Database_1 = require("../database/Database");
const db = Database_1.Database.getInstance();
async function main() {
    await db.initialize();
    const loader = GameLoader_1.GameLoader.getInstance();
    const ledger = await loader.getIds();
    let count = 0;
    for (const entry of ledger) {
        db.storeParticipants({ gameId: entry.gameId, participantIds: entry.participantIds })
            .catch((err) => {
            if (err instanceof Error && err.message.includes('duplicate key value')) {
                return;
            }
            console.error(`Could not save ${entry.gameId}: ${err}`);
        }).then(() => {
            count++;
            if (count === ledger.length || count % 1000 === 0) {
                console.log(`Completed ${count} of ${ledger.length}`);
            }
        });
    }
}
main();
