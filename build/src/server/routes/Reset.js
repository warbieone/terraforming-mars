"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reset = void 0;
const responses = require("../server/responses");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const Types_1 = require("../../common/Types");
class Reset extends Handler_1.Handler {
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
        if (game.getPlayers().length > 1) {
            throw new Error('Reset is only available for solo games at the moment.');
        }
        let player;
        try {
            player = game.getPlayerById(playerId);
        }
        catch (err) {
            console.warn(`unable to find player ${playerId}`, err);
        }
        if (player === undefined) {
            responses.notFound(req, res);
            return;
        }
        if (player.game.activePlayer !== player.id) {
            responses.badRequest(req, res, 'Not the active player');
            return;
        }
        try {
            const game = await ctx.gameLoader.getGame(player.game.id, true);
            if (game !== undefined) {
                const reloadedPlayer = game.getPlayerById(player.id);
                game.inputsThisRound = 0;
                responses.writeJson(res, ServerModel_1.Server.getPlayerModel(reloadedPlayer));
                return;
            }
        }
        catch (err) {
            console.error(err);
        }
        responses.badRequest(req, res, 'Could not reset');
    }
}
exports.Reset = Reset;
Reset.INSTANCE = new Reset();
