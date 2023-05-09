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
exports.ApiSpectator = void 0;
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const Types_1 = require("../../common/Types");
class ApiSpectator extends Handler_1.Handler {
    constructor() {
        super();
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = ctx.url.searchParams.get('id');
            if (!id) {
                ctx.route.badRequest(req, res, 'invalid id');
                return;
            }
            let game;
            if ((0, Types_1.isSpectatorId)(id)) {
                game = yield ctx.gameLoader.getGame(id);
            }
            if (game === undefined) {
                ctx.route.notFound(req, res);
                return;
            }
            ctx.route.writeJson(res, ServerModel_1.Server.getSpectatorModel(game));
        });
    }
}
exports.ApiSpectator = ApiSpectator;
ApiSpectator.INSTANCE = new ApiSpectator();
