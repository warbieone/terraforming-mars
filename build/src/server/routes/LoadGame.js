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
exports.LoadGame = void 0;
const Database_1 = require("../database/Database");
const GameLoader_1 = require("../database/GameLoader");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
class LoadGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    put(req, res, ctx) {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', function (data) {
                body += data.toString();
            });
            req.once('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const gameReq = JSON.parse(body);
                    const gameId = gameReq.gameId;
                    const rollbackCount = gameReq.rollbackCount;
                    if (rollbackCount > 0) {
                        Database_1.Database.getInstance().deleteGameNbrSaves(gameId, rollbackCount);
                    }
                    const game = yield GameLoader_1.GameLoader.getInstance().getGame(gameId, true);
                    if (game === undefined) {
                        console.warn(`unable to find ${gameId} in database`);
                        ctx.route.notFound(req, res, 'game_id not found');
                    }
                    else {
                        ctx.route.writeJson(res, ServerModel_1.Server.getSimpleGameModel(game));
                    }
                }
                catch (error) {
                    ctx.route.internalServerError(req, res, error);
                }
                resolve();
            }));
        });
    }
}
exports.LoadGame = LoadGame;
LoadGame.INSTANCE = new LoadGame();
//# sourceMappingURL=LoadGame.js.map