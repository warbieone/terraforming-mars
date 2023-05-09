"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const html_escaper_1 = require("html-escaper");
class Route {
    badRequest(req, res, err) {
        console.warn('bad request', req.url);
        res.writeHead(400);
        res.write('Bad request');
        if (err) {
            res.write(': ');
            res.write(err);
        }
        res.end();
    }
    notFound(req, res, err) {
        if (!process.argv.includes('hide-not-found-warnings')) {
            console.warn('Not found', req.method, req.url);
        }
        res.writeHead(404);
        res.write('Not found');
        if (err) {
            res.write(': ');
            res.write(err);
        }
        res.end();
    }
    notModified(res) {
        res.writeHead(304);
        res.end();
    }
    internalServerError(req, res, err) {
        console.warn('internal server error: ', req.url, err);
        res.writeHead(500);
        res.write('Internal server error: ');
        if (err instanceof Error) {
            res.write((0, html_escaper_1.escape)(err.message));
        }
        else if (typeof (err) === 'string') {
            res.write((0, html_escaper_1.escape)(err));
        }
        else {
            res.write('unknown error');
        }
        res.end();
    }
    notAuthorized(req, res) {
        console.warn('Not authorized', req.method, req.url);
        res.writeHead(403);
        res.write('Not authorized');
        res.end();
    }
    downgradeRedirect(_req, res, ctx) {
        const url = new URL(ctx.url);
        url.searchParams.set('serverId', ctx.ids.statsId);
        res.writeHead(301, { Location: url.pathname + url.search });
        res.end();
    }
    writeJson(res, json, space) {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json, undefined, space));
    }
}
exports.Route = Route;
