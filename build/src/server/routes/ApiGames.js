"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiGames = void 0;
const responses = require("./responses");
const Handler_1 = require("./Handler");
class ApiGames extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    async get(req, res, ctx) {
        const list = await ctx.gameLoader.getIds();
        if (list === undefined) {
            responses.notFound(req, res, 'could not load game list');
            return;
        }
        responses.writeJson(res, list);
    }
}
exports.ApiGames = ApiGames;
ApiGames.INSTANCE = new ApiGames();
