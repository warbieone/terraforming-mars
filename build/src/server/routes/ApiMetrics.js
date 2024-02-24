"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMetrics = void 0;
const prometheus = require("prom-client");
const responses = require("./responses");
const Handler_1 = require("./Handler");
class ApiMetrics extends Handler_1.Handler {
    constructor() {
        super({ validateServerId: true });
    }
    async get(req, res, _ctx) {
        try {
            const register = prometheus.register;
            res.setHeader('Content-Type', register.contentType);
            res.end(await register.metrics());
        }
        catch (err) {
            console.error(err);
            responses.badRequest(req, res, 'could not load metrics');
        }
    }
}
exports.ApiMetrics = ApiMetrics;
ApiMetrics.INSTANCE = new ApiMetrics();
