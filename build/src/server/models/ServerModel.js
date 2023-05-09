"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Color_1 = require("../../common/Color");
const IProjectCard_1 = require("../cards/IProjectCard");
const ICloneTagCard_1 = require("../cards/pathfinders/ICloneTagCard");
const PlayerInputType_1 = require("../../common/input/PlayerInputType");
const TileType_1 = require("../../common/TileType");
const Phase_1 = require("../../common/Phase");
const TurmoilModel_1 = require("../models/TurmoilModel");
const Units_1 = require("../../common/Units");
const Turmoil_1 = require("../turmoil/Turmoil");
const PathfindersModel_1 = require("./PathfindersModel");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const CardName_1 = require("../../common/cards/CardName");
const Tag_1 = require("../../common/cards/Tag");
const ICorporationCard_1 = require("../cards/corporation/ICorporationCard");
const AresHandler_1 = require("../ares/AresHandler");
const AwardScorer_1 = require("../awards/AwardScorer");
class Server {
    static getSimpleGameModel(game) {
        return {
            activePlayer: game.getPlayerById(game.activePlayer).color,
            id: game.id,
            phase: game.phase,
            players: game.getPlayersInGenerationOrder().map((player) => ({
                color: player.color,
                id: player.id,
                name: player.name,
            })),
            spectatorId: game.spectatorId,
            gameOptions: this.getGameOptionsAsModel(game.gameOptions),
            lastSoloGeneration: game.lastSoloGeneration(),
            expectedPurgeTimeMs: game.expectedPurgeTimeMs(),
        };
    }
    static getGameModel(game) {
        const turmoil = (0, TurmoilModel_1.getTurmoilModel)(game);
        return {
            aresData: game.aresData,
            awards: this.getAwards(game),
            colonies: this.getColonies(game, game.colonies),
            deckSize: game.projectDeck.drawPile.length,
            discardedColonies: game.discardedColonies.map((c) => c.name),
            expectedPurgeTimeMs: game.expectedPurgeTimeMs(),
            gameAge: game.gameAge,
            gameOptions: this.getGameOptionsAsModel(game.gameOptions),
            generation: game.getGeneration(),
            isSoloModeWin: game.isSoloModeWin(),
            lastSoloGeneration: game.lastSoloGeneration(),
            milestones: this.getMilestones(game),
            moon: this.getMoonModel(game),
            oceans: game.board.getOceanCount(),
            oxygenLevel: game.getOxygenLevel(),
            passedPlayers: game.getPassedPlayers(),
            pathfinders: (0, PathfindersModel_1.createPathfindersModel)(game),
            phase: game.phase,
            spaces: this.getSpaces(game.board),
            spectatorId: game.spectatorId,
            temperature: game.getTemperature(),
            isTerraformed: game.marsIsTerraformed(),
            turmoil: turmoil,
            undoCount: game.undoCount,
            venusScaleLevel: game.getVenusScaleLevel(),
            step: game.lastSaveId,
            corporationsToDraft: this.getCards(game.getPlayers()[0], game.corporationsToDraft),
        };
    }
    static getPlayerModel(player) {
        const game = player.game;
        const players = game.getPlayersInGenerationOrder().map(this.getPlayer);
        const thisPlayerIndex = players.findIndex((p) => p.color === player.color);
        const thisPlayer = players[thisPlayerIndex];
        return {
            cardsInHand: this.getCards(player, player.cardsInHand, { showCalculatedCost: true }),
            ceoCardsInHand: this.getCards(player, player.ceoCardsInHand),
            dealtCorporationCards: this.getCards(player, player.dealtCorporationCards),
            dealtPreludeCards: this.getCards(player, player.dealtPreludeCards),
            dealtCeoCards: this.getCards(player, player.dealtCeoCards),
            dealtProjectCards: this.getCards(player, player.dealtProjectCards),
            draftedCorporations: this.getCards(player, player.draftedCorporations),
            draftedCards: this.getCards(player, player.draftedCards, { showCalculatedCost: true }),
            game: this.getGameModel(player.game),
            id: player.id,
            pickedCorporationCard: player.pickedCorporationCard ? this.getCards(player, [player.pickedCorporationCard]) : [],
            preludeCardsInHand: this.getCards(player, player.preludeCardsInHand),
            thisPlayer: thisPlayer,
            waitingFor: this.getWaitingFor(player, player.getWaitingFor()),
            players: players,
        };
    }
    static getSpectatorModel(game) {
        return {
            color: Color_1.Color.NEUTRAL,
            id: game.spectatorId,
            game: this.getGameModel(game),
            players: game.getPlayersInGenerationOrder().map(this.getPlayer),
            thisPlayer: undefined,
        };
    }
    static getSelfReplicatingRobotsTargetCards(player) {
        return player.getSelfReplicatingRobotsTargetCards().map((targetCard) => {
            const model = {
                resources: targetCard.resourceCount,
                name: targetCard.card.name,
                calculatedCost: player.getCardCost(targetCard.card),
                isDisabled: false,
                reserveUnits: Units_1.Units.EMPTY,
                isSelfReplicatingRobotsCard: true,
            };
            return model;
        });
    }
    static getMilestones(game) {
        const allMilestones = game.milestones;
        const claimedMilestones = game.claimedMilestones;
        const milestoneModels = [];
        for (const milestone of allMilestones) {
            const claimed = claimedMilestones.find((m) => m.milestone.name === milestone.name);
            let scores = [];
            if (claimed === undefined && claimedMilestones.length < 3) {
                scores = game.getPlayers().map((player) => ({
                    playerColor: player.color,
                    playerScore: milestone.getScore(player),
                }));
            }
            milestoneModels.push({
                playerName: claimed === undefined ? '' : claimed.player.name,
                playerColor: claimed === undefined ? '' : claimed.player.color,
                name: milestone.name,
                scores,
            });
        }
        return milestoneModels;
    }
    static getAwards(game) {
        const fundedAwards = game.fundedAwards;
        const awardModels = [];
        for (const award of game.awards) {
            const funded = fundedAwards.find((a) => a.award.name === award.name);
            const scorer = new AwardScorer_1.AwardScorer(game, award);
            let scores = [];
            if (fundedAwards.length < 3 || funded !== undefined) {
                scores = game.getPlayers().map((player) => ({
                    playerColor: player.color,
                    playerScore: scorer.get(player),
                }));
            }
            awardModels.push({
                playerName: funded === undefined ? '' : funded.player.name,
                playerColor: funded === undefined ? '' : funded.player.color,
                name: award.name,
                scores: scores,
            });
        }
        return awardModels;
    }
    static getWaitingFor(player, waitingFor) {
        var _a;
        if (waitingFor === undefined) {
            return undefined;
        }
        const playerInputModel = {
            title: waitingFor.title,
            buttonLabel: waitingFor.buttonLabel,
            inputType: waitingFor.inputType,
            amount: undefined,
            options: undefined,
            cards: undefined,
            max: undefined,
            min: undefined,
            canUseSteel: undefined,
            canUseTitanium: undefined,
            canUseLunaTradeFederationTitanium: undefined,
            canUseHeat: undefined,
            canUseSeeds: undefined,
            canUseData: undefined,
            players: undefined,
            availableSpaces: undefined,
            maxByDefault: undefined,
            microbes: undefined,
            floaters: undefined,
            science: undefined,
            seeds: undefined,
            data: undefined,
            coloniesModel: undefined,
            payProduction: undefined,
            aresData: undefined,
            selectBlueCardAction: false,
            availableParties: undefined,
            turmoil: undefined,
            showReset: player.game.inputsThisRound > 0 && player.game.resettable === true && player.game.phase === Phase_1.Phase.ACTION,
        };
        switch (waitingFor.inputType) {
            case PlayerInputType_1.PlayerInputType.AND_OPTIONS:
            case PlayerInputType_1.PlayerInputType.OR_OPTIONS:
            case PlayerInputType_1.PlayerInputType.SELECT_INITIAL_CARDS:
                playerInputModel.options = [];
                if (waitingFor.options !== undefined) {
                    for (const option of waitingFor.options) {
                        const subOption = this.getWaitingFor(player, option);
                        if (subOption !== undefined) {
                            playerInputModel.options.push(subOption);
                        }
                    }
                }
                else {
                    throw new Error('required options not defined');
                }
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_PROJECT_CARD_TO_PLAY:
                const spctp = waitingFor;
                playerInputModel.cards = this.getCards(player, spctp.cards, { showCalculatedCost: true, reserveUnits: spctp.reserveUnits });
                playerInputModel.microbes = player.getSpendableMicrobes();
                playerInputModel.floaters = player.getSpendableFloaters();
                playerInputModel.canUseHeat = player.canUseHeatAsMegaCredits;
                playerInputModel.canUseLunaTradeFederationTitanium = player.canUseTitaniumAsMegacredits;
                playerInputModel.science = player.getSpendableScienceResources();
                playerInputModel.seeds = player.getSpendableSeedResources();
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_CARD:
                const selectCard = waitingFor;
                playerInputModel.cards = this.getCards(player, selectCard.cards, {
                    showCalculatedCost: selectCard.config.played === false || selectCard.config.played === CardName_1.CardName.SELF_REPLICATING_ROBOTS,
                    showResources: selectCard.config.played === true || selectCard.config.played === CardName_1.CardName.SELF_REPLICATING_ROBOTS,
                    enabled: selectCard.config.enabled,
                });
                playerInputModel.max = selectCard.config.max;
                playerInputModel.min = selectCard.config.min;
                playerInputModel.showOnlyInLearnerMode = (_a = selectCard.config.enabled) === null || _a === void 0 ? void 0 : _a.every((p) => p === false);
                playerInputModel.selectBlueCardAction = selectCard.config.selectBlueCardAction;
                playerInputModel.showOwner = selectCard.config.showOwner === true;
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_COLONY:
                const selectColony = waitingFor;
                playerInputModel.coloniesModel = this.getColonyModel(player.game, selectColony.colonies, selectColony.showTileOnly);
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_PAYMENT:
                const sp = waitingFor;
                playerInputModel.amount = sp.amount;
                playerInputModel.canUseSteel = sp.canUseSteel;
                playerInputModel.canUseTitanium = sp.canUseTitanium;
                playerInputModel.canUseHeat = sp.canUseHeat;
                playerInputModel.canUseLunaTradeFederationTitanium = sp.canUseLunaTradeFederationTitanium;
                playerInputModel.canUseSeeds = sp.canUseSeeds;
                playerInputModel.seeds = player.getSpendableSeedResources();
                playerInputModel.canUseData = sp.canUseData;
                playerInputModel.data = player.getSpendableData();
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_PLAYER:
                playerInputModel.players = waitingFor.players.map((player) => player.color);
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_SPACE:
                playerInputModel.availableSpaces = waitingFor.availableSpaces.map((space) => space.id);
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_AMOUNT:
                playerInputModel.min = waitingFor.min;
                playerInputModel.max = waitingFor.max;
                playerInputModel.maxByDefault = waitingFor.maxByDefault;
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_DELEGATE:
                playerInputModel.players = waitingFor.players.map((player) => {
                    if (player === 'NEUTRAL') {
                        return 'NEUTRAL';
                    }
                    else {
                        return player.color;
                    }
                });
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_PARTY_TO_SEND_DELEGATE:
                playerInputModel.availableParties = waitingFor.availableParties;
                if (player.game !== undefined) {
                    playerInputModel.turmoil = (0, TurmoilModel_1.getTurmoilModel)(player.game);
                }
                break;
            case PlayerInputType_1.PlayerInputType.SELECT_PRODUCTION_TO_LOSE:
                const _player = waitingFor.player;
                playerInputModel.payProduction = {
                    cost: waitingFor.unitsToLose,
                    units: {
                        megacredits: _player.production.megacredits,
                        steel: _player.production.steel,
                        titanium: _player.production.titanium,
                        plants: _player.production.plants,
                        energy: _player.production.energy,
                        heat: _player.production.heat,
                    },
                };
                break;
            case PlayerInputType_1.PlayerInputType.SHIFT_ARES_GLOBAL_PARAMETERS:
                AresHandler_1.AresHandler.ifAres(waitingFor.player.game, (aresData) => {
                    playerInputModel.aresData = aresData;
                });
                break;
        }
        return playerInputModel;
    }
    static getCards(player, cards, options = {}) {
        return cards.map((card, index) => {
            var _a;
            let discount = card.cardDiscount === undefined ? undefined : (Array.isArray(card.cardDiscount) ? card.cardDiscount : [card.cardDiscount]);
            if (card.name === CardName_1.CardName.CRESCENT_RESEARCH_ASSOCIATION) {
                discount = [{ tag: Tag_1.Tag.MOON, amount: player.tags.count(Tag_1.Tag.MOON) }];
            }
            if (card.name === CardName_1.CardName.MARS_DIRECT) {
                discount = [{ tag: Tag_1.Tag.MARS, amount: player.tags.count(Tag_1.Tag.MARS) }];
            }
            const isDisabled = (0, ICorporationCard_1.isICorporationCard)(card) ? (card.isDisabled || false) : (((_a = options.enabled) === null || _a === void 0 ? void 0 : _a[index]) === false);
            const model = {
                resources: options.showResources ? card.resourceCount : undefined,
                name: card.name,
                calculatedCost: options.showCalculatedCost ? ((0, IProjectCard_1.isIProjectCard)(card) && card.cost !== undefined ? player.getCardCost(card) : undefined) : card.cost,
                isDisabled: isDisabled,
                warning: card.warning,
                reserveUnits: options.reserveUnits ? options.reserveUnits[index] : Units_1.Units.EMPTY,
                bonusResource: (0, IProjectCard_1.isIProjectCard)(card) ? card.bonusResource : undefined,
                discount: discount,
                cloneTag: (0, ICloneTagCard_1.isICloneTagCard)(card) ? card.cloneTag : undefined,
            };
            return model;
        });
    }
    static getPlayer(player) {
        const game = player.game;
        return {
            actionsTakenThisRound: player.actionsTakenThisRound,
            actionsTakenThisGame: player.actionsTakenThisGame,
            actionsThisGeneration: Array.from(player.getActionsThisGeneration()),
            availableBlueCardActionCount: player.getAvailableBlueActionCount(),
            cardCost: player.cardCost,
            cardDiscount: player.colonies.cardDiscount,
            cardsInHandNbr: player.cardsInHand.length,
            citiesCount: player.game.getCitiesCount(player),
            coloniesCount: player.getColoniesCount(),
            color: player.color,
            energy: player.energy,
            energyProduction: player.production.energy,
            fleetSize: player.colonies.getFleetSize(),
            heat: player.heat,
            heatProduction: player.production.heat,
            id: game.phase === Phase_1.Phase.END ? player.id : undefined,
            influence: Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => turmoil.getPlayerInfluence(player), () => 0),
            isActive: player.id === game.activePlayer,
            lastCardPlayed: player.lastCardPlayed,
            megaCredits: player.megaCredits,
            megaCreditProduction: player.production.megacredits,
            name: player.name,
            needsToDraft: player.needsToDraft,
            needsToResearch: !game.hasResearched(player),
            noTagsCount: player.getNoTagsCount(),
            plants: player.plants,
            plantProduction: player.production.plants,
            protectedResources: Server.getResourceProtections(player),
            protectedProduction: Server.getProductionProtections(player),
            tableau: Server.getCards(player, player.tableau, { showResources: true }),
            selfReplicatingRobotsCards: Server.getSelfReplicatingRobotsTargetCards(player),
            steel: player.steel,
            steelProduction: player.production.steel,
            steelValue: player.getSteelValue(),
            tags: player.tags.getAllTags(),
            terraformRating: player.getTerraformRating(),
            timer: player.timer.serialize(),
            titanium: player.titanium,
            titaniumProduction: player.production.titanium,
            titaniumValue: player.getTitaniumValue(),
            tradesThisGeneration: player.colonies.tradesThisGeneration,
            victoryPointsBreakdown: player.getVictoryPoints(),
            victoryPointsByGeneration: player.victoryPointsByGeneration,
        };
    }
    static getResourceProtections(player) {
        const protection = {
            megacredits: 'off',
            steel: 'off',
            titanium: 'off',
            plants: 'off',
            energy: 'off',
            heat: 'off',
        };
        if (player.alloysAreProtected()) {
            protection.steel = 'on';
            protection.titanium = 'on';
        }
        if (player.plantsAreProtected()) {
            protection.plants = 'on';
        }
        else if (player.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
            protection.plants = 'half';
        }
        return protection;
    }
    static getProductionProtections(player) {
        const defaultProteection = player.cardIsInEffect(CardName_1.CardName.PRIVATE_SECURITY) ? 'on' : 'off';
        const protection = {
            megacredits: defaultProteection,
            steel: defaultProteection,
            titanium: defaultProteection,
            plants: defaultProteection,
            energy: defaultProteection,
            heat: defaultProteection,
        };
        if (player.alloysAreProtected()) {
            protection.steel = 'on';
            protection.titanium = 'on';
        }
        return protection;
    }
    static getColonies(game, colonies, isActive = true) {
        return colonies.map((colony) => ({
            colonies: colony.colonies.map((playerId) => game.getPlayerById(playerId).color),
            isActive: isActive && colony.isActive,
            name: colony.name,
            trackPosition: colony.trackPosition,
            visitor: colony.visitor === undefined ?
                undefined :
                game.getPlayerById(colony.visitor).color,
        }));
    }
    static getColor(space) {
        var _a;
        if ((space.tile === undefined || space.tile.tileType !== TileType_1.TileType.OCEAN) &&
            space.player !== undefined) {
            return space.player.color;
        }
        if (((_a = space.tile) === null || _a === void 0 ? void 0 : _a.protectedHazard) === true) {
            return Color_1.Color.BRONZE;
        }
        return undefined;
    }
    static getSpaces(board) {
        const volcanicSpaceIds = board.getVolcanicSpaceIds();
        const noctisCitySpaceIds = board.getNoctisCitySpaceId();
        return board.spaces.map((space) => {
            let highlight = undefined;
            if (volcanicSpaceIds.includes(space.id)) {
                highlight = 'volcanic';
            }
            else if (noctisCitySpaceIds === space.id) {
                highlight = 'noctis';
            }
            return {
                x: space.x,
                y: space.y,
                id: space.id,
                bonus: space.bonus,
                spaceType: space.spaceType,
                tileType: space.tile && space.tile.tileType,
                color: this.getColor(space),
                highlight: highlight,
            };
        });
    }
    static getGameOptionsAsModel(options) {
        return {
            altVenusBoard: options.altVenusBoard,
            aresExtension: options.aresExtension,
            boardName: options.boardName,
            bannedCards: options.bannedCards,
            ceoExtension: options.ceoExtension,
            coloniesExtension: options.coloniesExtension,
            communityCardsOption: options.communityCardsOption,
            corporateEra: options.corporateEra,
            draftVariant: options.draftVariant,
            corporationsDraft: options.corporationsDraft,
            escapeVelocityMode: options.escapeVelocityMode,
            escapeVelocityThreshold: options.escapeVelocityThreshold,
            escapeVelocityPeriod: options.escapeVelocityPeriod,
            escapeVelocityPenalty: options.escapeVelocityPenalty,
            fastModeOption: options.fastModeOption,
            includeFanMA: options.includeFanMA,
            includeVenusMA: options.includeVenusMA,
            initialDraftVariant: options.initialDraftVariant,
            moonExpansion: options.moonExpansion,
            pathfindersExpansion: options.pathfindersExpansion,
            preludeExtension: options.preludeExtension,
            promoCardsOption: options.promoCardsOption,
            politicalAgendasExtension: options.politicalAgendasExtension,
            removeNegativeGlobalEvents: options.removeNegativeGlobalEventsOption,
            showOtherPlayersVP: options.showOtherPlayersVP,
            showTimers: options.showTimers,
            shuffleMapOption: options.shuffleMapOption,
            solarPhaseOption: options.solarPhaseOption,
            soloTR: options.soloTR,
            randomMA: options.randomMA,
            requiresMoonTrackCompletion: options.requiresMoonTrackCompletion,
            requiresVenusTrackCompletion: options.requiresVenusTrackCompletion,
            turmoilExtension: options.turmoilExtension,
            twoCorpsVariant: options.twoCorpsVariant,
            venusNextExtension: options.venusNextExtension,
            undoOption: options.undoOption,
        };
    }
    static getColonyModel(game, colonies, showTileOnly) {
        return colonies.map((colony) => ({
            colonies: colony.colonies.map((playerId) => game.getPlayerById(playerId).color),
            isActive: colony.isActive && showTileOnly === false,
            name: colony.name,
            trackPosition: colony.trackPosition,
            visitor: colony.visitor === undefined ?
                undefined :
                game.getPlayerById(colony.visitor).color,
        }));
    }
    static getMoonModel(game) {
        return MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => {
            return {
                logisticsRate: moonData.logisticRate,
                miningRate: moonData.miningRate,
                colonyRate: moonData.colonyRate,
                spaces: this.getSpaces(moonData.moon),
            };
        }, () => undefined);
    }
}
exports.Server = Server;