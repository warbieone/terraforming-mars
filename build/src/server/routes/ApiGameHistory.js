"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGameHistory = void 0;
const responses = require("../server/responses");
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
const Types_1 = require("../../common/Types");
class ApiGameHistory extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    async get(req, res, ctx) {
        const gameId = ctx.url.searchParams.get('id');
        if (!gameId) {
            responses.badRequest(req, res, 'missing id parameter');
            return;
        }
        if (!(0, Types_1.isGameId)(gameId)) {
            responses.badRequest(req, res, 'Invalid game id');
            return;
        }
        try {
            const saveIds = await Database_1.Database.getInstance().getSaveIds(gameId);
            responses.writeJson(res, [...saveIds].sort());
        }
        catch (err) {
            console.error(err);
            responses.badRequest(req, res, 'could not load admin stats');
        }
    }
}
exports.ApiGameHistory = ApiGameHistory;
ApiGameHistory.INSTANCE = new ApiGameHistory();
