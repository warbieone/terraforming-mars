"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processRequest = void 0;
const paths = require("../common/app/paths");
const ApiCloneableGame_1 = require("./routes/ApiCloneableGame");
const ApiGameLogs_1 = require("./routes/ApiGameLogs");
const ApiGames_1 = require("./routes/ApiGames");
const ApiGame_1 = require("./routes/ApiGame");
const ApiGameHistory_1 = require("./routes/ApiGameHistory");
const ApiPlayer_1 = require("./routes/ApiPlayer");
const ApiStats_1 = require("./routes/ApiStats");
const ApiMetrics_1 = require("./routes/ApiMetrics");
const ApiSpectator_1 = require("./routes/ApiSpectator");
const ApiWaitingFor_1 = require("./routes/ApiWaitingFor");
const Game_1 = require("./routes/Game");
const GameLoader_1 = require("./database/GameLoader");
const GamesOverview_1 = require("./routes/GamesOverview");
const Load_1 = require("./routes/Load");
const LoadGame_1 = require("./routes/LoadGame");
const PlayerInput_1 = require("./routes/PlayerInput");
const ServeApp_1 = require("./routes/ServeApp");
const ServeAsset_1 = require("./routes/ServeAsset");
const server_ids_1 = require("./server-ids");
const Reset_1 = require("./routes/Reset");
const handlers = new Map([
    ['', ServeApp_1.ServeApp.INSTANCE],
    [paths.ADMIN, ServeApp_1.ServeApp.INSTANCE],
    [paths.API_CLONEABLEGAME, ApiCloneableGame_1.ApiCloneableGame.INSTANCE],
    [paths.API_GAME, ApiGame_1.ApiGame.INSTANCE],
    [paths.API_GAME_HISTORY, ApiGameHistory_1.ApiGameHistory.INSTANCE],
    [paths.API_GAME_LOGS, ApiGameLogs_1.ApiGameLogs.INSTANCE],
    [paths.API_GAMES, ApiGames_1.ApiGames.INSTANCE],
    [paths.API_METRICS, ApiMetrics_1.ApiMetrics.INSTANCE],
    [paths.API_PLAYER, ApiPlayer_1.ApiPlayer.INSTANCE],
    [paths.API_STATS, ApiStats_1.ApiStats.INSTANCE],
    [paths.API_SPECTATOR, ApiSpectator_1.ApiSpectator.INSTANCE],
    [paths.API_WAITING_FOR, ApiWaitingFor_1.ApiWaitingFor.INSTANCE],
    [paths.CARDS, ServeApp_1.ServeApp.INSTANCE],
    ['favicon.ico', ServeAsset_1.ServeAsset.INSTANCE],
    [paths.GAME, Game_1.GameHandler.INSTANCE],
    [paths.GAMES_OVERVIEW, GamesOverview_1.GamesOverview.INSTANCE],
    [paths.HELP, ServeApp_1.ServeApp.INSTANCE],
    [paths.LOAD, Load_1.Load.INSTANCE],
    [paths.LOAD_GAME, LoadGame_1.LoadGame.INSTANCE],
    ['main.js', ServeAsset_1.ServeAsset.INSTANCE],
    ['main.js.map', ServeAsset_1.ServeAsset.INSTANCE],
    [paths.NEW_GAME, ServeApp_1.ServeApp.INSTANCE],
    [paths.PLAYER, ServeApp_1.ServeApp.INSTANCE],
    [paths.PLAYER_INPUT, PlayerInput_1.PlayerInput.INSTANCE],
    [paths.RESET, Reset_1.Reset.INSTANCE],
    [paths.SPECTATOR, ServeApp_1.ServeApp.INSTANCE],
    ['styles.css', ServeAsset_1.ServeAsset.INSTANCE],
    ['sw.js', ServeAsset_1.ServeAsset.INSTANCE],
    [paths.THE_END, ServeApp_1.ServeApp.INSTANCE],
]);
function processRequest(req, res, route) {
    if (req.method === 'HEAD') {
        res.end();
        return;
    }
    if (req.url === undefined) {
        route.notFound(req, res);
        return;
    }
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname.substring(1);
    const ctx = { url, route, gameLoader: GameLoader_1.GameLoader.getInstance(), ids: { serverId: server_ids_1.serverId, statsId: server_ids_1.statsId } };
    const handler = handlers.get(pathname);
    if (handler !== undefined) {
        handler.processRequest(req, res, ctx);
    }
    else if (req.method === 'GET' && pathname.startsWith('assets/')) {
        ServeAsset_1.ServeAsset.INSTANCE.get(req, res, ctx);
    }
    else {
        route.notFound(req, res);
    }
}
exports.processRequest = processRequest;
