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
exports.ApiPlayer = void 0;
const Types_1 = require("../../common/Types");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
class ApiPlayer extends Handler_1.Handler {
    constructor() {
        super();
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerId = ctx.url.searchParams.get('id');
            if (playerId === null) {
                ctx.route.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isPlayerId)(playerId)) {
                ctx.route.badRequest(req, res, 'invalid player id');
                return;
            }
            const game = yield ctx.gameLoader.getGame(playerId);
            if (game === undefined) {
                ctx.route.notFound(req, res);
                return;
            }
            try {
                const player = game.getPlayerById(playerId);
                ctx.route.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
            }
            catch (err) {
                console.warn(`unable to find player ${playerId}`, err);
                ctx.route.notFound(req, res);
                return;
            }
        });
    }
}
exports.ApiPlayer = ApiPlayer;
ApiPlayer.INSTANCE = new ApiPlayer();
