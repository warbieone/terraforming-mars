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
exports.ApiCloneableGame = void 0;
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
const Types_1 = require("../../common/Types");
class ApiCloneableGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = ctx.url.searchParams.get('id');
            if (gameId === null) {
                ctx.route.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isGameId)(gameId)) {
                ctx.route.badRequest(req, res, 'invalid game id');
                return;
            }
            yield Database_1.Database.getInstance().getPlayerCount(gameId)
                .then((playerCount) => {
                ctx.route.writeJson(res, { gameId, playerCount });
            })
                .catch((err) => {
                console.warn('Could not load cloneable game: ', err);
                ctx.route.notFound(req, res);
            });
        });
    }
}
exports.ApiCloneableGame = ApiCloneableGame;
ApiCloneableGame.INSTANCE = new ApiCloneableGame();
