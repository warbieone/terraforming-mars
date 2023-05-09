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
exports.ApiStats = void 0;
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
class ApiStats extends Handler_1.Handler {
    constructor() {
        super({ validateStatsId: true });
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const stats = yield Database_1.Database.getInstance().stats();
                ctx.route.writeJson(res, stats, 2);
            }
            catch (err) {
                console.error(err);
                ctx.route.badRequest(req, res, 'could not load admin stats');
            }
        });
    }
}
exports.ApiStats = ApiStats;
ApiStats.INSTANCE = new ApiStats();
