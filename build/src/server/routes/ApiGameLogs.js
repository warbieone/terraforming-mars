"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGameLogs = void 0;
const responses = require("./responses");
const Handler_1 = require("./Handler");
const GameLogs_1 = require("./GameLogs");
const Types_1 = require("../../common/Types");
class ApiGameLogs extends Handler_1.Handler {
    constructor(gameLogs = new GameLogs_1.GameLogs()) {
        super();
        this.gameLogs = gameLogs;
    }
    async get(req, res, ctx) {
        const searchParams = ctx.url.searchParams;
        const id = searchParams.get('id');
        if (!id) {
            responses.badRequest(req, res, 'missing id parameter');
            return;
        }
        if (!(0, Types_1.isPlayerId)(id) && !(0, Types_1.isSpectatorId)(id)) {
            responses.badRequest(req, res, 'invalid player id');
            return;
        }
        const game = await ctx.gameLoader.getGame(id);
        if (game === undefined) {
            responses.notFound(req, res, 'game not found');
            return;
        }
        if (searchParams.get('full') !== null) {
            let logs = '';
            try {
                logs = this.gameLogs.getLogsForGameEnd(game).join('\n');
            }
            catch (e) {
                responses.badRequest(req, res, 'cannot fetch game-end log');
                return;
            }
            res.setHeader('Content-Type', 'text/plain');
            res.end(logs);
        }
        else {
            const generation = searchParams.get('generation');
            const logs = this.gameLogs.getLogsForGameView(id, game, generation);
            responses.writeJson(res, logs);
        }
    }
}
exports.ApiGameLogs = ApiGameLogs;
ApiGameLogs.INSTANCE = new ApiGameLogs();
