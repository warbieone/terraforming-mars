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
exports.ApiGameLogs = void 0;
const Handler_1 = require("./Handler");
const GameLogs_1 = require("./GameLogs");
const Types_1 = require("../../common/Types");
class ApiGameLogs extends Handler_1.Handler {
    constructor(gameLogs = new GameLogs_1.GameLogs()) {
        super();
        this.gameLogs = gameLogs;
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchParams = ctx.url.searchParams;
            const id = searchParams.get('id');
            if (!id) {
                ctx.route.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isPlayerId)(id) && !(0, Types_1.isSpectatorId)(id)) {
                ctx.route.badRequest(req, res, 'invalid player id');
                return;
            }
            const game = yield ctx.gameLoader.getGame(id);
            if (game === undefined) {
                ctx.route.notFound(req, res, 'game not found');
                return;
            }
            if (searchParams.get('full') !== null) {
                let logs = '';
                try {
                    logs = this.gameLogs.getLogsForGameEnd(game).join('\n');
                }
                catch (e) {
                    ctx.route.badRequest(req, res, 'cannot fetch game-end log');
                    return;
                }
                res.setHeader('Content-Type', 'text/plain');
                res.end(logs);
            }
            else {
                const generation = searchParams.get('generation');
                const logs = this.gameLogs.getLogsForGameView(id, game, generation);
                ctx.route.writeJson(res, logs);
            }
        });
    }
}
exports.ApiGameLogs = ApiGameLogs;
ApiGameLogs.INSTANCE = new ApiGameLogs();
