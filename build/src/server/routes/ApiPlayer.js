"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPlayer = void 0;
const responses = require("../server/responses");
const Types_1 = require("../../common/Types");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
class ApiPlayer extends Handler_1.Handler {
    constructor() {
        super();
    }
    async get(req, res, ctx) {
        const playerId = ctx.url.searchParams.get('id');
        if (playerId === null) {
            responses.badRequest(req, res, 'missing id parameter');
            return;
        }
        if (!(0, Types_1.isPlayerId)(playerId)) {
            responses.badRequest(req, res, 'invalid player id');
            return;
        }
        const game = await ctx.gameLoader.getGame(playerId);
        if (game === undefined) {
            responses.notFound(req, res);
            return;
        }
        try {
            ctx.ipTracker.addParticipant(playerId, ctx.ip);
            const player = game.getPlayerById(playerId);
            responses.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
        }
        catch (err) {
            console.warn(`unable to find player ${playerId}`, err);
            responses.notFound(req, res);
            return;
        }
    }
}
exports.ApiPlayer = ApiPlayer;
ApiPlayer.INSTANCE = new ApiPlayer();
