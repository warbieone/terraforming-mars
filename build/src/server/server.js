"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
require('console-stamp')(console, { format: ':date(yyyy-mm-dd HH:MM:ss Z)' });
const https = require("https");
const http = require("http");
const fs = require("fs");
const raw_settings = require("../genfiles/settings.json");
const prometheus = require("prom-client");
const responses = require("./server/responses");
const ansi = require("ansi-escape-sequences");
const Database_1 = require("./database/Database");
const server_ids_1 = require("./utils/server-ids");
const requestProcessor_1 = require("./server/requestProcessor");
const timer_1 = require("./utils/timer");
const GameLoader_1 = require("./database/GameLoader");
const globalInitialize_1 = require("./globalInitialize");
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION', err);
});
function requestHandler(req, res) {
    try {
        (0, requestProcessor_1.processRequest)(req, res);
    }
    catch (error) {
        responses.internalServerError(req, res, error);
    }
}
const metrics = {
    startServer: new prometheus.Gauge({
        name: 'server_start_server',
        help: 'Time to initialize the server',
        registers: [prometheus.register],
    }),
    startDatabase: new prometheus.Gauge({
        name: 'server_start_database',
        help: 'Time to initialize the database',
        registers: [prometheus.register],
    }),
};
function createServer() {
    if (process.env.KEY_PATH && process.env.CERT_PATH) {
        const httpsHowto = 'https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/';
        if (!fs.existsSync(process.env.KEY_PATH)) {
            console.error('TLS KEY_PATH is set in .env, but cannot find key! Check out ' +
                httpsHowto);
        }
        else if (!fs.existsSync(process.env.CERT_PATH)) {
            console.error('TLS CERT_PATH is set in .env, but cannot find cert! Check out' +
                httpsHowto);
        }
        const options = {
            key: fs.readFileSync(process.env.KEY_PATH),
            cert: fs.readFileSync(process.env.CERT_PATH),
        };
        return https.createServer(options, requestHandler);
    }
    else {
        return http.createServer(requestHandler);
    }
}
async function start() {
    prometheus.register.setDefaultLabels({
        app: 'terraforming-mars-app',
    });
    prometheus.collectDefaultMetrics();
    (0, globalInitialize_1.globalInitialize)();
    const server = createServer();
    await (0, timer_1.timeAsync)(Database_1.Database.getInstance().initialize())
        .then((v) => {
        metrics.startDatabase.set(v.duration);
    });
    try {
        const stats = await Database_1.Database.getInstance().stats();
        console.log(JSON.stringify(stats, undefined, 2));
    }
    catch (err) {
        console.error(err);
    }
    GameLoader_1.GameLoader.getInstance().maintenance();
    const port = process.env.PORT || 8080;
    console.log(`Starting ${raw_settings.head}, built at ${raw_settings.builtAt}`);
    console.log(`Starting server on port ${port}`);
    server.listen(port);
    if (!process.env.SERVER_ID) {
        console.log(`The secret serverId for this server is ${ansi.style.bold}${server_ids_1.serverId}${ansi.style.reset}.`);
        console.log(`Administrative routes can be found at admin?serverId=${server_ids_1.serverId}`);
    }
    console.log(`The public run ID is ${server_ids_1.runId}`);
    console.log('Server is ready.');
}
try {
    start();
}
catch (err) {
    console.error('Cannot start server:');
    console.error(err);
}
