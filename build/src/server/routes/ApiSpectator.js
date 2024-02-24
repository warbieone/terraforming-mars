"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiSpectator = void 0;
const responses = require("./responses");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const Types_1 = require("../../common/Types");
class ApiSpectator extends Handler_1.Handler {
    constructor() {
        super();
    }
    async get(req, res, ctx) {
        const id = ctx.url.searchParams.get('id');
        if (!id) {
            responses.badRequest(req, res, 'invalid id');
            return;
        }
        let game;
        if ((0, Types_1.isSpectatorId)(id)) {
            game = await ctx.gameLoader.getGame(id);
        }
        if (game === undefined) {
            responses.notFound(req, res);
            return;
        }
        responses.writeJson(res, ServerModel_1.Server.getSpectatorModel(game));
    }
}
exports.ApiSpectator = ApiSpectator;
ApiSpectator.INSTANCE = new ApiSpectator();
