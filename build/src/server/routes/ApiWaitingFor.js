"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiWaitingFor = void 0;
const responses = require("./responses");
const Handler_1 = require("./Handler");
const Phase_1 = require("../../common/Phase");
const Types_1 = require("../../common/Types");
class ApiWaitingFor extends Handler_1.Handler {
    constructor() {
        super();
    }
    timeToGo(player) {
        return player.getWaitingFor() !== undefined || player.game.phase === Phase_1.Phase.END;
    }
    getPlayerWaitingForModel(player, game, gameAge, undoCount) {
        if (this.timeToGo(player)) {
            return { result: 'GO' };
        }
        else if (game.gameAge > gameAge || game.undoCount > undoCount) {
            return { result: 'REFRESH' };
        }
        return { result: 'WAIT' };
    }
    getSpectatorWaitingForModel(game, gameAge, undoCount) {
        if (game.gameAge > gameAge || game.undoCount > undoCount) {
            return { result: 'REFRESH' };
        }
        return { result: 'WAIT' };
    }
    async get(req, res, ctx) {
        const id = String(ctx.url.searchParams.get('id'));
        const gameAge = Number(ctx.url.searchParams.get('gameAge'));
        const undoCount = Number(ctx.url.searchParams.get('undoCount'));
        let game;
        if ((0, Types_1.isSpectatorId)(id) || (0, Types_1.isPlayerId)(id)) {
            game = await ctx.gameLoader.getGame(id);
        }
        if (game === undefined) {
            responses.notFound(req, res, 'cannot find game for that player');
            return;
        }
        try {
            if ((0, Types_1.isPlayerId)(id)) {
                ctx.ipTracker.addParticipant(id, ctx.ip);
                responses.writeJson(res, this.getPlayerWaitingForModel(game.getPlayerById(id), game, gameAge, undoCount));
            }
            else if ((0, Types_1.isSpectatorId)(id)) {
                responses.writeJson(res, this.getSpectatorWaitingForModel(game, gameAge, undoCount));
            }
            else {
                responses.internalServerError(req, res, 'id not found');
            }
        }
        catch (err) {
            console.warn(`unable to find player ${id}`, err);
            responses.notFound(req, res, 'player not found');
        }
    }
}
exports.ApiWaitingFor = ApiWaitingFor;
ApiWaitingFor.INSTANCE = new ApiWaitingFor();
