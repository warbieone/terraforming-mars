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
exports.ApiGames = void 0;
const Handler_1 = require("./Handler");
class ApiGames extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    get(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield ctx.gameLoader.getIds();
            if (list === undefined) {
                ctx.route.notFound(req, res, 'could not load game list');
                return;
            }
            ctx.route.writeJson(res, list);
        });
    }
}
exports.ApiGames = ApiGames;
ApiGames.INSTANCE = new ApiGames();
