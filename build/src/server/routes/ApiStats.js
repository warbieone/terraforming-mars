"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStats = void 0;
const responses = require("../server/responses");
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
class ApiStats extends Handler_1.Handler {
    constructor() {
        super({ validateStatsId: true });
    }
    async get(req, res, _ctx) {
        try {
            const stats = await Database_1.Database.getInstance().stats();
            responses.writeJson(res, stats, 2);
        }
        catch (err) {
            console.error(err);
            responses.badRequest(req, res, 'could not load admin stats');
        }
    }
}
exports.ApiStats = ApiStats;
ApiStats.INSTANCE = new ApiStats();
