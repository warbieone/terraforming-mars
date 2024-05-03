"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const Color_1 = require("../../common/Color");
const TileType_1 = require("../../common/TileType");
const Phase_1 = require("../../common/Phase");
const TurmoilModel_1 = require("../models/TurmoilModel");
const Turmoil_1 = require("../turmoil/Turmoil");
const PathfindersModel_1 = require("./PathfindersModel");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const CardName_1 = require("../../common/cards/CardName");
const AwardScorer_1 = require("../awards/AwardScorer");
const ModelUtils_1 = require("./ModelUtils");
const server_ids_1 = require("../utils/server-ids");
const UnderworldExpansion_1 = require("../underworld/UnderworldExpansion");
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
            colonies: (0, ModelUtils_1.coloniesToModel)(game, game.colonies, false, true),
            deckSize: game.projectDeck.drawPile.length,
            discardedColonies: game.discardedColonies.map((c) => c.name),
            expectedPurgeTimeMs: game.expectedPurgeTimeMs(),
            gameAge: game.gameAge,
            gameOptions: this.getGameOptionsAsModel(game.gameOptions),
            generation: game.getGeneration(),
            globalsPerGeneration: game.gameIsOver() ? game.globalsPerGeneration : [],
            isSoloModeWin: game.isSoloModeWin(),
            lastSoloGeneration: game.lastSoloGeneration(),
            milestones: this.getMilestones(game),
            moon: this.getMoonModel(game),
            oceans: game.board.getOceanSpaces().length,
            oxygenLevel: game.getOxygenLevel(),
            passedPlayers: game.getPassedPlayers(),
            pathfinders: (0, PathfindersModel_1.createPathfindersModel)(game),
            phase: game.phase,
            spaces: this.getSpaces(game.board, game.gagarinBase, game.stJosephCathedrals, game.nomadSpace),
            spectatorId: game.spectatorId,
            temperature: game.getTemperature(),
            isTerraformed: game.marsIsTerraformed(),
            turmoil: turmoil,
            undoCount: game.undoCount,
            venusScaleLevel: game.getVenusScaleLevel(),
            step: game.lastSaveId,
        };
    }
    static getPlayerModel(player) {
        const game = player.game;
        const players = game.getPlayersInGenerationOrder().map(this.getPlayer);
        const thisPlayerIndex = players.findIndex((p) => p.color === player.color);
        const thisPlayer = players[thisPlayerIndex];
        return {
            cardsInHand: (0, ModelUtils_1.cardsToModel)(player, player.cardsInHand, { showCalculatedCost: true }),
            ceoCardsInHand: (0, ModelUtils_1.cardsToModel)(player, player.ceoCardsInHand),
            dealtCorporationCards: (0, ModelUtils_1.cardsToModel)(player, player.dealtCorporationCards),
            dealtPreludeCards: (0, ModelUtils_1.cardsToModel)(player, player.dealtPreludeCards),
            dealtCeoCards: (0, ModelUtils_1.cardsToModel)(player, player.dealtCeoCards),
            dealtProjectCards: (0, ModelUtils_1.cardsToModel)(player, player.dealtProjectCards),
            draftedCards: (0, ModelUtils_1.cardsToModel)(player, player.draftedCards, { showCalculatedCost: true }),
            game: this.getGameModel(player.game),
            id: player.id,
            runId: server_ids_1.runId,
            pickedCorporationCard: player.pickedCorporationCard ? (0, ModelUtils_1.cardsToModel)(player, [player.pickedCorporationCard]) : [],
            preludeCardsInHand: (0, ModelUtils_1.cardsToModel)(player, player.preludeCardsInHand),
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
            runId: server_ids_1.runId,
        };
    }
    static getSelfReplicatingRobotsTargetCards(player) {
        return player.getSelfReplicatingRobotsTargetCards().map((targetCard) => {
            const model = {
                resources: targetCard.resourceCount,
                name: targetCard.name,
                calculatedCost: player.getCardCost(targetCard),
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
        if (waitingFor === undefined) {
            return undefined;
        }
        return waitingFor.toModel(player);
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
            citiesCount: player.game.board.getCities(player).length,
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
            noTagsCount: player.tags.numberOfCardsWithNoTags(),
            plants: player.plants,
            plantProduction: player.production.plants,
            protectedResources: Server.getResourceProtections(player),
            protectedProduction: Server.getProductionProtections(player),
            tableau: (0, ModelUtils_1.cardsToModel)(player, player.tableau, { showResources: true }),
            selfReplicatingRobotsCards: Server.getSelfReplicatingRobotsTargetCards(player),
            steel: player.steel,
            steelProduction: player.production.steel,
            steelValue: player.getSteelValue(),
            tags: player.tags.countAllTags(),
            terraformRating: player.getTerraformRating(),
            timer: player.timer.serialize(),
            titanium: player.titanium,
            titaniumProduction: player.production.titanium,
            titaniumValue: player.getTitaniumValue(),
            tradesThisGeneration: player.colonies.tradesThisGeneration,
            victoryPointsBreakdown: player.getVictoryPoints(),
            victoryPointsByGeneration: player.victoryPointsByGeneration,
            corruption: player.underworldData.corruption,
            excavations: UnderworldExpansion_1.UnderworldExpansion.excavationMarkerCount(player),
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
    static getColor(space) {
        if ((space.tile === undefined || space.tile.tileType !== TileType_1.TileType.OCEAN) &&
            space.player !== undefined) {
            return space.player.color;
        }
        if (space.tile?.protectedHazard === true) {
            return Color_1.Color.BRONZE;
        }
        return undefined;
    }
    static getSpaces(board, gagarin = [], cathedrals = [], nomads = undefined) {
        const volcanicSpaceIds = board.volcanicSpaceIds;
        const noctisCitySpaceId = board.noctisCitySpaceId;
        return board.spaces.map((space) => {
            let highlight = undefined;
            if (volcanicSpaceIds.includes(space.id)) {
                highlight = 'volcanic';
            }
            else if (noctisCitySpaceId === space.id) {
                highlight = 'noctis';
            }
            const model = {
                x: space.x,
                y: space.y,
                id: space.id,
                spaceType: space.spaceType,
                bonus: space.bonus,
            };
            const tileType = space.tile?.tileType;
            if (tileType !== undefined) {
                model.tileType = tileType;
            }
            const color = this.getColor(space);
            if (color !== undefined) {
                model.color = color;
            }
            if (highlight === undefined) {
                model.highlight = highlight;
            }
            if (space.tile?.rotated === true) {
                model.rotated = true;
            }
            const gagarinIndex = gagarin.indexOf(space.id);
            if (gagarinIndex > -1) {
                model.gagarin = gagarinIndex;
            }
            if (cathedrals.includes(space.id)) {
                model.cathedral = true;
            }
            if (space.id === nomads) {
                model.nomads = true;
            }
            if (space.undergroundResources !== undefined) {
                model.undergroundResources = space.undergroundResources;
            }
            if (space.excavator !== undefined) {
                model.excavator = space.excavator.color;
            }
            if (space.coOwner !== undefined) {
                model.coOwner = space.coOwner.color;
            }
            return model;
        });
    }
    static getGameOptionsAsModel(options) {
        return {
            altVenusBoard: options.altVenusBoard,
            aresExtension: options.aresExtension,
            boardName: options.boardName,
            bannedCards: options.bannedCards,
            includedCards: options.includedCards,
            ceoExtension: options.ceoExtension,
            coloniesExtension: options.coloniesExtension,
            communityCardsOption: options.communityCardsOption,
            corporateEra: options.corporateEra,
            draftVariant: options.draftVariant,
            escapeVelocityMode: options.escapeVelocityMode,
            escapeVelocityThreshold: options.escapeVelocityThreshold,
            escapeVelocityBonusSeconds: options.escapeVelocityBonusSeconds,
            escapeVelocityPeriod: options.escapeVelocityPeriod,
            escapeVelocityPenalty: options.escapeVelocityPenalty,
            fastModeOption: options.fastModeOption,
            includeFanMA: options.includeFanMA,
            includeVenusMA: options.includeVenusMA,
            initialDraftVariant: options.initialDraftVariant,
            moonExpansion: options.moonExpansion,
            pathfindersExpansion: options.pathfindersExpansion,
            preludeDraftVariant: options.preludeDraftVariant,
            preludeExtension: options.preludeExtension,
            prelude2Expansion: options.prelude2Expansion,
            promoCardsOption: options.promoCardsOption,
            leagueCardsOption: options.leagueCardsOption,
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
            underworldExpansion: options.underworldExpansion,
        };
    }
    static getMoonModel(game) {
        return MoonExpansion_1.MoonExpansion.ifElseMoon(game, (moonData) => {
            return {
                logisticsRate: moonData.logisticRate,
                miningRate: moonData.miningRate,
                habitatRate: moonData.habitatRate,
                spaces: this.getSpaces(moonData.moon),
            };
        }, () => undefined);
    }
}
exports.Server = Server;
