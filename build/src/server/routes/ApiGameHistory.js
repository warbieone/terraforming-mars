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
exports.ApiGameHistory = void 0;
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
const Types_1 = require("../../common/Types");
class ApiGameHistory extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const gameId = ctx.url.searchParams.get('id');
            if (!gameId) {
                ctx.route.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isGameId)(gameId)) {
                ctx.route.badRequest(req, res, 'Invalid game id');
                return;
            }
            try {
                const saveIds = yield Database_1.Database.getInstance().getSaveIds(gameId);
                ctx.route.writeJson(res, [...saveIds].sort());
            }
            catch (err) {
                console.error(err);
                ctx.route.badRequest(req, res, 'could not load admin stats');
            }
        });
    }
}
exports.ApiGameHistory = ApiGameHistory;
ApiGameHistory.INSTANCE = new ApiGameHistory();
