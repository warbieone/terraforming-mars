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
const ServerModel_1 = require("../models/ServerModel");
const Handler_1 = require("./Handler");
const OrOptions_1 = require("../inputs/OrOptions");
const UndoActionOption_1 = require("../inputs/UndoActionOption");
const Types_1 = require("../../common/Types");
class PlayerInput extends Handler_1.Handler {
    constructor() {
        super();
    }
    post(req, res, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerId = ctx.url.searchParams.get('id');
            if (playerId === null) {
                ctx.route.badRequest(req, res, 'missing id parameter');
                return;
            }
            if (!(0, Types_1.isPlayerId)(playerId)) {
                ctx.route.badRequest(req, res, 'invalid player id');
                return;
            }
            const game = yield ctx.gameLoader.getGame(playerId);
            if (game === undefined) {
                ctx.route.notFound(req, res);
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
                ctx.route.notFound(req, res);
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
            ctx.route.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
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
                    if (this.isWaitingForUndo(player, entity)) {
                        yield this.performUndo(req, res, ctx, player);
                    }
                    else {
                        player.process(entity);
                        ctx.route.writeJson(res, ServerModel_1.Server.getPlayerModel(player));
                    }
                    resolve();
                }
                catch (e) {
                    res.writeHead(400, {
                        'Content-Type': 'application/json',
                    });
                    console.warn('Error processing input from player', e);
                    const message = e instanceof Error ? e.message : String(e);
                    res.write(JSON.stringify({ message }));
                    res.end();
                    resolve();
                }
            }));
        });
    }
}
exports.PlayerInput = PlayerInput;
PlayerInput.INSTANCE = new PlayerInput();
