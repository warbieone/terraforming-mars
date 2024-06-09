"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiCloneableGame = void 0;
const responses = require("../server/responses");
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
const Types_1 = require("../../common/Types");
class ApiCloneableGame extends Handler_1.Handler {
    constructor() {
        super();
    }
    async get(req, res, ctx) {
        const gameId = ctx.url.searchParams.get('id');
        if (gameId === null) {
            responses.badRequest(req, res, 'missing id parameter');
            return;
        }
        if (!(0, Types_1.isGameId)(gameId)) {
            responses.badRequest(req, res, 'invalid game id');
            return;
        }
        await Database_1.Database.getInstance().getPlayerCount(gameId)
            .then((playerCount) => {
            responses.writeJson(res, { gameId, playerCount });
        })
            .catch((err) => {
            console.warn('Could not load cloneable game: ', err);
            responses.notFound(req, res);
        });
    }
}
exports.ApiCloneableGame = ApiCloneableGame;
ApiCloneableGame.INSTANCE = new ApiCloneableGame();
