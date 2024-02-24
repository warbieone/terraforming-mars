"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesOverview = void 0;
const Handler_1 = require("./Handler");
const ServeAsset_1 = require("./ServeAsset");
class GamesOverview extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    get(req, res, ctx) {
        req.url = '/assets/index.html';
        return ServeAsset_1.ServeAsset.INSTANCE.get(req, res, ctx);
    }
}
exports.GamesOverview = GamesOverview;
GamesOverview.INSTANCE = new GamesOverview();
