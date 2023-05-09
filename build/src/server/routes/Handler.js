"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
class Handler {
    constructor(options) {
        this.options = {
            validateServerId: (options === null || options === void 0 ? void 0 : options.validateServerId) === true,
            validateStatsId: (options === null || options === void 0 ? void 0 : options.validateStatsId) === true,
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
            ctx.route.notAuthorized(req, res);
            return Promise.resolve();
        }
        if (this.options.validateStatsId) {
            if (this.isServerIdValid(ctx)) {
                ctx.route.downgradeRedirect(req, res, ctx);
                return Promise.resolve();
            }
            if (!this.isStatsIdValid(ctx)) {
                ctx.route.notAuthorized(req, res);
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
                ctx.route.badRequest(req, res, 'Bad method');
                return Promise.resolve();
        }
    }
    get(req, res, ctx) {
        ctx.route.notFound(req, res);
        return Promise.resolve();
    }
    put(req, res, ctx) {
        ctx.route.notFound(req, res);
        return Promise.resolve();
    }
    post(req, res, ctx) {
        ctx.route.notFound(req, res);
        return Promise.resolve();
    }
}
exports.Handler = Handler;
