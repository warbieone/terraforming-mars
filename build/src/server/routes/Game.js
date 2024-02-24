"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameHandler = void 0;
const responses = require("./responses");
const Handler_1 = require("./Handler");
const Database_1 = require("../database/Database");
const BoardName_1 = require("../../common/boards/BoardName");
const RandomBoardOption_1 = require("../../common/boards/RandomBoardOption");
const Cloner_1 = require("../database/Cloner");
const GameLoader_1 = require("../database/GameLoader");
const Game_1 = require("../Game");
const Player_1 = require("../Player");
const ServerModel_1 = require("../models/ServerModel");
const ServeAsset_1 = require("./ServeAsset");
const server_ids_1 = require("../utils/server-ids");
const QuotaHandler_1 = require("../server/QuotaHandler");
const durations_1 = require("../utils/durations");
function get() {
    const defaultQuota = { limit: 1, perMs: 1 };
    const val = process.env.GAME_QUOTA;
    try {
        if (val === undefined) {
            throw new Error('Undefined quota');
        }
        const struct = JSON.parse(val);
        let { limit, per } = struct;
        if (limit === undefined) {
            throw new Error('limit is absent');
        }
        limit = Number.parseInt(limit);
        if (isNaN(limit)) {
            throw new Error('limit is invalid');
        }
        if (per === undefined) {
            throw new Error('per is absent');
        }
        const perMs = (0, durations_1.durationToMilliseconds)(per);
        if (isNaN(perMs)) {
            throw new Error('perMillis is invalid');
        }
        return { limit, perMs };
    }
    catch (e) {
        console.log(e);
        return defaultQuota;
    }
}
class GameHandler extends Handler_1.Handler {
    constructor(quotaConfig = get()) {
        super();
        this.quotaHandler = new QuotaHandler_1.QuotaHandler(quotaConfig);
    }
    static boardOptions(board) {
        const allBoards = Object.values(BoardName_1.BoardName);
        if (board === RandomBoardOption_1.RandomBoardOption.ALL)
            return allBoards;
        if (board === RandomBoardOption_1.RandomBoardOption.OFFICIAL) {
            return allBoards.filter((name) => {
                return name === BoardName_1.BoardName.THARSIS ||
                    name === BoardName_1.BoardName.HELLAS ||
                    name === BoardName_1.BoardName.ELYSIUM;
            });
        }
        return [board];
    }
    get(req, res, ctx) {
        req.url = '/assets/index.html';
        return ServeAsset_1.ServeAsset.INSTANCE.get(req, res, ctx);
    }
    put(req, res, ctx) {
        return new Promise((resolve) => {
            if (this.quotaHandler.measure(ctx) === false) {
                responses.quotaExceeded(req, res);
                resolve();
                return;
            }
            let body = '';
            req.on('data', function (data) {
                body += data.toString();
            });
            req.once('end', async () => {
                try {
                    const gameReq = JSON.parse(body);
                    const gameId = (0, server_ids_1.generateRandomId)('g');
                    const spectatorId = (0, server_ids_1.generateRandomId)('s');
                    const players = gameReq.players.map((obj) => {
                        return new Player_1.Player(obj.name, obj.color, obj.beginner, Number(obj.handicap), (0, server_ids_1.generateRandomId)('p'));
                    });
                    let firstPlayerIdx = 0;
                    for (let i = 0; i < gameReq.players.length; i++) {
                        if (gameReq.players[i].first === true) {
                            firstPlayerIdx = i;
                            break;
                        }
                    }
                    const boards = GameHandler.boardOptions(gameReq.board);
                    gameReq.board = boards[Math.floor(Math.random() * boards.length)];
                    const gameOptions = {
                        boardName: gameReq.board,
                        clonedGamedId: gameReq.clonedGamedId,
                        undoOption: gameReq.undoOption,
                        showTimers: gameReq.showTimers,
                        fastModeOption: gameReq.fastModeOption,
                        showOtherPlayersVP: gameReq.showOtherPlayersVP,
                        corporateEra: gameReq.corporateEra,
                        venusNextExtension: gameReq.venusNext,
                        coloniesExtension: gameReq.colonies,
                        preludeExtension: gameReq.prelude,
                        prelude2Expansion: gameReq.prelude2Expansion,
                        turmoilExtension: gameReq.turmoil,
                        aresExtension: gameReq.aresExtension,
                        aresHazards: true,
                        politicalAgendasExtension: gameReq.politicalAgendasExtension,
                        moonExpansion: gameReq.moonExpansion,
                        pathfindersExpansion: gameReq.pathfindersExpansion,
                        promoCardsOption: gameReq.promoCardsOption,
                        leagueCardsOption: gameReq.leagueCardsOption,
                        communityCardsOption: gameReq.communityCardsOption,
                        solarPhaseOption: gameReq.solarPhaseOption,
                        removeNegativeGlobalEventsOption: gameReq.removeNegativeGlobalEventsOption,
                        includeVenusMA: gameReq.includeVenusMA,
                        draftVariant: gameReq.draftVariant,
                        initialDraftVariant: gameReq.initialDraft,
                        startingCorporations: gameReq.startingCorporations,
                        shuffleMapOption: gameReq.shuffleMapOption,
                        randomMA: gameReq.randomMA,
                        includeFanMA: gameReq.includeFanMA,
                        soloTR: gameReq.soloTR,
                        customCorporationsList: gameReq.customCorporationsList,
                        bannedCards: gameReq.bannedCards,
                        extraCards: gameReq.extraCards,
                        customColoniesList: gameReq.customColoniesList,
                        customPreludes: gameReq.customPreludes,
                        requiresVenusTrackCompletion: gameReq.requiresVenusTrackCompletion,
                        requiresMoonTrackCompletion: gameReq.requiresMoonTrackCompletion,
                        moonStandardProjectVariant: gameReq.moonStandardProjectVariant,
                        altVenusBoard: gameReq.altVenusBoard,
                        escapeVelocityMode: gameReq.escapeVelocityMode,
                        escapeVelocityThreshold: gameReq.escapeVelocityThreshold,
                        escapeVelocityBonusSeconds: gameReq.escapeVelocityBonusSeconds,
                        escapeVelocityPeriod: gameReq.escapeVelocityPeriod,
                        escapeVelocityPenalty: gameReq.escapeVelocityPenalty,
                        twoCorpsVariant: gameReq.twoCorpsVariant,
                        ceoExtension: gameReq.ceoExtension,
                        customCeos: gameReq.customCeos,
                        startingCeos: gameReq.startingCeos,
                        starWarsExpansion: gameReq.starWarsExpansion,
                        underworldExpansion: gameReq.underworldExpansion,
                    };
                    let game;
                    if (gameOptions.clonedGamedId !== undefined && !gameOptions.clonedGamedId.startsWith('#')) {
                        const serialized = await Database_1.Database.getInstance().getGameVersion(gameOptions.clonedGamedId, 0);
                        game = Cloner_1.Cloner.clone(gameId, players, firstPlayerIdx, serialized);
                    }
                    else {
                        const seed = Math.random();
                        game = Game_1.Game.newInstance(gameId, players, players[firstPlayerIdx], gameOptions, seed, spectatorId);
                    }
                    GameLoader_1.GameLoader.getInstance().add(game);
                    responses.writeJson(res, ServerModel_1.Server.getSimpleGameModel(game));
                }
                catch (error) {
                    responses.internalServerError(req, res, error);
                }
                resolve();
            });
        });
    }
}
exports.GameHandler = GameHandler;
GameHandler.INSTANCE = new GameHandler();
