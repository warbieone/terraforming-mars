"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Load = void 0;
const Handler_1 = require("./Handler");
const ServeApp_1 = require("./ServeApp");
class Load extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    get(req, res, ctx) {
        req.url = '/assets/index.html';
        return ServeApp_1.ServeApp.INSTANCE.get(req, res, ctx);
    }
}
exports.Load = Load;
Load.INSTANCE = new Load();
