"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const responses = require("../server/responses");
class Handler {
    constructor(options) {
        this.options = {
            validateServerId: options?.validateServerId === true,
            validateStatsId: options?.validateStatsId === true,
        };
    }
    isServerIdValid(ctx) {
        const serverId = ctx.url.searchParams.get('serverId');
        return serverId !== null && serverId === ctx.ids.serverId;
    }
    isStatsIdValid(ctx) {
        const serverId = ctx.url.searchParams.get('serverId');
        return serverId !== null && serverId === ctx.ids.statsId;
    }
    processRequest(req, res, ctx) {
        if (this.options.validateServerId && !this.isServerIdValid(ctx)) {
            responses.notAuthorized(req, res);
            return Promise.resolve();
        }
        if (this.options.validateStatsId) {
            if (this.isServerIdValid(ctx)) {
                responses.downgradeRedirect(req, res, ctx);
                return Promise.resolve();
            }
            if (!this.isStatsIdValid(ctx)) {
                responses.notAuthorized(req, res);
                return Promise.resolve();
            }
        }
        switch (req.method) {
            case 'GET':
                return this.get(req, res, ctx);
            case 'PUT':
                return this.put(req, res, ctx);
            case 'POST':
                return this.post(req, res, ctx);
            default:
                responses.badRequest(req, res, 'Bad method');
                return Promise.resolve();
        }
    }
    get(req, res, _ctx) {
        responses.notFound(req, res);
        return Promise.resolve();
    }
    put(req, res, _ctx) {
        responses.notFound(req, res);
        return Promise.resolve();
    }
    post(req, res, _ctx) {
        responses.notFound(req, res);
        return Promise.resolve();
    }
}
exports.Handler = Handler;
