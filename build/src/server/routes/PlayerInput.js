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
exports.PlayerInput = void 0;
const responses = require("./responses");
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const OrOptions_1 = require("../inputs/OrOptions");
const UndoActionOption_1 = require("../inputs/UndoActionOption");
const Types_1 = require("../../common/Types");
const server_ids_1 = require("../utils/server-ids");
const AppError_1 = require("../server/AppError");
const statusCode_1 = require("../../common/http/statusCode");
class PlayerInput extends Handler_1.Handler {
    constructor() {
        super();
    }
    post(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerId = ctx.url.searchParams.get('id');
            if (playerId === null) {
                responses.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isPlayerId)(playerId)) {
                responses.badRequest(req, res, 'invalid player id');
                return;
            }
            ctx.ipTracker.addParticipant(playerId, ctx.ip);
            const game = yield ctx.gameLoader.getGame(playerId);
            if (game === undefined) {
                responses.notFound(req, res);
                return;
            }
            let player;
            try {
                player = game.getPlayerById(playerId);
            }
            catch (err) {
                console.warn(`unable to find player ${playerId}`, err);
            }
            if (player === undefined) {
                responses.notFound(req, res);
                return;
            }
            return this.processInput(req, res, ctx, player);
        });
    }
    isWaitingForUndo(player, entity) {
        const waitingFor = player.getWaitingFor();
        if (entity.type === 'or' && waitingFor instanceof OrOptions_1.OrOptions) {
            const idx = entity.index;
            return waitingFor.options[idx] instanceof UndoActionOption_1.UndoActionOption;
        }
        return false;
    }
    performUndo(_req, res, ctx, player) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastSaveId = player.game.lastSaveId - 2;
            try {
                const game = yield ctx.gameLoader.restoreGameAt(player.game.id, lastSaveId);
                if (game === undefined) {
                    player.game.log('Unable to perform undo operation. Error retrieving game from database. Please try again.', () => { }, { reservedFor: player });
                }
                else {
                    player = game.getPlayerById(player.id);
                }
            }
            catch (err) {
                console.error(err);
            }
            responses.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
        });
    }
    processInput(req, res, ctx, player) {
        return new Promise((resolve) => {
            let body = '';
            req.on('data', (data) => {
                body += data.toString();
            });
            req.once('end', () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const entity = JSON.parse(body);
                    validateRunId(entity);
                    if (this.isWaitingForUndo(player, entity)) {
                        yield this.performUndo(req, res, ctx, player);
                    }
                    else {
                        player.process(entity);
                        responses.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
                    }
                    resolve();
                }
                catch (e) {
                    if (!(e instanceof AppError_1.AppError)) {
                        console.warn('Error processing input from player', e);
                    }
                    res.writeHead(statusCode_1.statusCode.badRequest, {
                        'Content-Type': 'application/json',
                    });
                    const id = e instanceof AppError_1.AppError ? e.id : undefined;
                    const message = e instanceof Error ? e.message : String(e);
                    res.write(JSON.stringify({ id: id, message: message }));
                    res.end();
                    resolve();
                }
            }));
        });
    }
}
exports.PlayerInput = PlayerInput;
PlayerInput.INSTANCE = new PlayerInput();
function validateRunId(entity) {
    if (entity.runId !== undefined && server_ids_1.runId !== undefined) {
        if (entity.runId !== server_ids_1.runId) {
            throw new AppError_1.AppError('#invalid-run-id', 'The server has restarted. Click OK to refresh this page.');
        }
    }
    delete entity.runId;
}
//# sourceMappingURL=PlayerInput.js.map