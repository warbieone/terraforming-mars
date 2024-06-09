"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGame = void 0;
const responses = require("../server/responses");
const Handler_1 = require("./Handler");
const ServerModel_1 = require("../models/ServerModel");
const Types_1 = require("../../common/Types");
class ApiGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    async get(req, res, ctx) {
        const gameId = ctx.url.searchParams.get('id');
        if (!gameId) {
            responses.badRequest(req, res, 'missing id parameter');
            return;
        }
        let game;
        if ((0, Types_1.isGameId)(gameId)) {
            game = await ctx.gameLoader.getGame(gameId);
        }
        if (game === undefined) {
            responses.notFound(req, res, 'game not found');
            return;
        }
        const model = ServerModel_1.Server.getSimpleGameModel(game);
        responses.writeJson(res, model);
    }
}
exports.ApiGame = ApiGame;
ApiGame.INSTANCE = new ApiGame();
