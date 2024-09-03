"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadGame = void 0;
const responses = require("../server/responses");
const Database_1 = require("../database/Database");
const GameLoader_1 = require("../database/GameLoader");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const Types_1 = require("../../common/Types");
class LoadGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    async getGameId(id) {
        if ((0, Types_1.isGameId)(id)) {
            return id;
        }
        if ((0, Types_1.isPlayerId)(id) || (0, Types_1.isSpectatorId)(id)) {
            console.log(`Finding game for player/spectator ${id}`);
            return await Database_1.Database.getInstance().getGameId(id);
        }
        return undefined;
    }
    put(req, res, _ctx) {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', function (data) {
                body += data.toString();
            });
            req.once('end', async () => {
                try {
                    const gameReq = JSON.parse(body);
                    const gameId = await this.getGameId(gameReq.gameId);
                    if (gameId === undefined) {
                        throw new Error('Invalid game id');
                    }
                    const rollbackCount = gameReq.rollbackCount;
                    if (rollbackCount > 0) {
                        Database_1.Database.getInstance().deleteGameNbrSaves(gameId, rollbackCount);
                    }
                    const game = await GameLoader_1.GameLoader.getInstance().getGame(gameId, true);
                    if (game === undefined) {
                        console.warn(`unable to find ${gameId} in database`);
                        responses.notFound(req, res, 'game_id not found');
                    }
                    else {
                        responses.writeJson(res, ServerModel_1.Server.getSimpleGameModel(game));
                    }
                }
                catch (error) {
                    responses.internalServerError(req, res, error);
                }
                resolve();
            });
        });
    }
}
exports.LoadGame = LoadGame;
LoadGame.INSTANCE = new LoadGame();
