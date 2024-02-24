"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeApp = void 0;
const Handler_1 = require("./Handler");
const ServeAsset_1 = require("./ServeAsset");
class ServeApp extends Handler_1.Handler {
    constructor() {
        super();
    }
    get(req, res, ctx) {
        req.url = '/assets/index.html';
        return ServeAsset_1.ServeAsset.INSTANCE.get(req, res, ctx);
    }
}
exports.ServeApp = ServeApp;
ServeApp.INSTANCE = new ServeApp();
