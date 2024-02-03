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
exports.ApiGame = void 0;
const responses = require("./responses");
const Handler_1 = require("./Handler");
const ServerModel_1 = require("../models/ServerModel");
const Types_1 = require("../../common/Types");
class ApiGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = ctx.url.searchParams.get('id');
            if (!gameId) {
                responses.badRequest(req, res, 'missing id parameter');
                return;
            }
            let game;
            if ((0, Types_1.isGameId)(gameId)) {
                game = yield ctx.gameLoader.getGame(gameId);
            }
            if (game === undefined) {
                responses.notFound(req, res, 'game not found');
                return;
            }
            const model = ServerModel_1.Server.getSimpleGameModel(game);
            responses.writeJson(res, model);
        });
    }
}
exports.ApiGame = ApiGame;
ApiGame.INSTANCE = new ApiGame();
//# sourceMappingURL=ApiGame.js.map