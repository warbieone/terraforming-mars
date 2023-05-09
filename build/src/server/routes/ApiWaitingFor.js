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
exports.ApiWaitingFor = void 0;
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
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = String(ctx.url.searchParams.get('id'));
            const gameAge = Number(ctx.url.searchParams.get('gameAge'));
            const undoCount = Number(ctx.url.searchParams.get('undoCount'));
            let game;
            if ((0, Types_1.isSpectatorId)(id) || (0, Types_1.isPlayerId)(id)) {
                game = yield ctx.gameLoader.getGame(id);
            }
            if (game === undefined) {
                ctx.route.notFound(req, res, 'cannot find game for that player');
                return;
            }
            try {
                if ((0, Types_1.isPlayerId)(id)) {
                    ctx.route.writeJson(res, this.getPlayerWaitingForModel(game.getPlayerById(id), game, gameAge, undoCount));
                }
                else if ((0, Types_1.isSpectatorId)(id)) {
                    ctx.route.writeJson(res, this.getSpectatorWaitingForModel(game, gameAge, undoCount));
                }
                else {
                    ctx.route.internalServerError(req, res, 'id not found');
                }
            }
            catch (err) {
                console.warn(`unable to find player ${id}`, err);
                ctx.route.notFound(req, res, 'player not found');
            }
        });
    }
}
exports.ApiWaitingFor = ApiWaitingFor;
ApiWaitingFor.INSTANCE = new ApiWaitingFor();
