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
require('dotenv').config();
const GameLoader_1 = require("../database/GameLoader");
const Database_1 = require("../database/Database");
const db = Database_1.Database.getInstance();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db.initialize();
        const loader = GameLoader_1.GameLoader.getInstance();
        const ledger = yield loader.getIds();
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
    });
}
main();
