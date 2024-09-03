"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AresHandler = void 0;
const CardName_1 = require("../../common/cards/CardName");
const SelectCard_1 = require("../inputs/SelectCard");
const CardResource_1 = require("../../common/CardResource");
const SpaceBonus_1 = require("../../common/boards/SpaceBonus");
const AresTileType_1 = require("../../common/AresTileType");
const TileType_1 = require("../../common/TileType");
const mnemonist_1 = require("mnemonist");
const Phase_1 = require("../../common/Phase");
const SelectPaymentDeferred_1 = require("../deferredActions/SelectPaymentDeferred");
const SelectProductionToLoseDeferred_1 = require("../deferredActions/SelectProductionToLoseDeferred");
const AresHazards_1 = require("./AresHazards");
const CrashlandingBonus_1 = require("../pathfinders/CrashlandingBonus");
class AresHandler {
    constructor() { }
    static ifAres(game, cb) {
        if (game.gameOptions.aresExtension) {
            if (game.aresData === undefined)
                throw new Error('Assertion failure: game.aresData is undefined');
            cb(game.aresData);
        }
    }
    static earnAdjacencyBonuses(player, space, options) {
        for (const adjacentSpace of player.game.board.getAdjacentSpaces(space)) {
            this.earnAdacencyBonus(space, adjacentSpace, player, options?.giveAresTileOwnerBonus);
        }
    }
    static earnAdacencyBonus(newTileSpace, adjacentSpace, player, giveAresTileOwnerBonus = true) {
        if (adjacentSpace.adjacency === undefined || adjacentSpace.adjacency.bonus.length === 0) {
            return;
        }
        const adjacentPlayer = adjacentSpace.player;
        if (adjacentPlayer === undefined) {
            throw new Error(`A tile with an adjacency bonus must have an owner (${adjacentSpace.x}, ${adjacentSpace.y}, ${adjacentSpace.adjacency.bonus}`);
        }
        const addResourceToCard = function (player, resourceType, resourceAsText) {
            const availableCards = player.getResourceCards(resourceType);
            if (availableCards.length === 0) {
                return;
            }
            else if (availableCards.length === 1) {
                player.addResourceTo(availableCards[0], { log: true });
            }
            else if (availableCards.length > 1) {
                player.defer(new SelectCard_1.SelectCard('Select a card to add an ' + resourceAsText, 'Add ' + resourceAsText + 's', availableCards)
                    .andThen((selected) => {
                    player.addResourceTo(selected[0], { log: true });
                    return undefined;
                }));
            }
        };
        const bonuses = new mnemonist_1.MultiSet();
        for (const bonus of adjacentSpace.adjacency.bonus) {
            if (bonus !== 'callback') {
                bonuses.add(bonus);
                continue;
            }
            const cardName = adjacentSpace.tile?.card;
            if (cardName !== CardName_1.CardName.CRASHLANDING) {
                throw new Error('\'callback\' only applies to Crashlanding now.');
            }
            const adjacentBonuses = CrashlandingBonus_1.CrashlandingBonus.onTilePlacedAdjacentToCrashlanding(player.game, adjacentSpace, newTileSpace);
            adjacentBonuses.forEach((bonus) => bonuses.add(bonus));
        }
        for (const [bonus, qty] of bonuses.multiplicities()) {
            for (let idx = 0; idx < qty; idx++) {
                switch (bonus) {
                    case SpaceBonus_1.SpaceBonus.ANIMAL:
                        addResourceToCard(player, CardResource_1.CardResource.ANIMAL, 'animal');
                        break;
                    case SpaceBonus_1.SpaceBonus.MEGACREDITS:
                        player.megaCredits++;
                        break;
                    case SpaceBonus_1.SpaceBonus.ENERGY:
                        player.energy++;
                        break;
                    case SpaceBonus_1.SpaceBonus.MICROBE:
                        addResourceToCard(player, CardResource_1.CardResource.MICROBE, 'microbe');
                        break;
                    default:
                        player.game.grantSpaceBonus(player, bonus);
                        break;
                }
            }
        }
        const bonusText = Array.from(bonuses.multiplicities())
            .map(([bonus, count]) => `${count} ${SpaceBonus_1.SpaceBonus.toString(bonus)}`)
            .join(', ');
        const tileText = adjacentSpace.tile !== undefined ? TileType_1.tileTypeToString[adjacentSpace.tile.tileType] : 'no tile';
        player.game.log('${0} gains ${1} for placing next to ${2}', (b) => b.player(player).string(bonusText).string(tileText));
        if (giveAresTileOwnerBonus) {
            let ownerBonus = 1;
            if (adjacentPlayer.cardIsInEffect(CardName_1.CardName.MARKETING_EXPERTS)) {
                ownerBonus = 2;
            }
            adjacentPlayer.megaCredits += ownerBonus;
            player.game.log('${0} gains ${1} M€ for a tile placed next to ${2}', (b) => b.player(adjacentPlayer).number(ownerBonus).string(tileText));
        }
    }
    static maybeIncrementMilestones(aresData, player, space) {
        const hasAdjacencyBonus = player.game.board.getAdjacentSpaces(space).some((adjacentSpace) => {
            return (adjacentSpace.adjacency?.bonus ?? []).length > 0;
        });
        if (hasAdjacencyBonus) {
            const entry = aresData.milestoneResults.find((e) => e.id === player.id);
            if (entry === undefined) {
                throw new Error('Player ID not in the Ares milestone results map: ' + player.id);
            }
            entry.count++;
        }
    }
    static hasHazardTile(space) {
        return (0, AresTileType_1.hazardSeverity)(space.tile?.tileType) !== AresTileType_1.HazardSeverity.NONE;
    }
    static computeAdjacencyCosts(player, space, subjectToHazardAdjacency) {
        if (player.isCorporation(CardName_1.CardName.ATHENA)) {
            subjectToHazardAdjacency = false;
        }
        const game = player.game;
        let megaCreditCost = 0;
        let productionCost = 0;
        game.board.getAdjacentSpaces(space).forEach((adjacentSpace) => {
            megaCreditCost += adjacentSpace.adjacency?.cost || 0;
            if (subjectToHazardAdjacency === true) {
                const severity = (0, AresTileType_1.hazardSeverity)(adjacentSpace.tile?.tileType);
                switch (severity) {
                    case AresTileType_1.HazardSeverity.MILD:
                        productionCost += 1;
                        break;
                    case AresTileType_1.HazardSeverity.SEVERE:
                        productionCost += 2;
                        break;
                }
            }
        });
        const severity = (0, AresTileType_1.hazardSeverity)(space.tile?.tileType);
        switch (severity) {
            case AresTileType_1.HazardSeverity.MILD:
                megaCreditCost += 8;
                break;
            case AresTileType_1.HazardSeverity.SEVERE:
                megaCreditCost += 16;
                break;
        }
        return { megacredits: megaCreditCost, production: productionCost };
    }
    static assertCanPay(player, space, subjectToHazardAdjacency) {
        if (player.game.phase === Phase_1.Phase.SOLAR) {
            return { megacredits: 0, production: 0 };
        }
        const cost = AresHandler.computeAdjacencyCosts(player, space, subjectToHazardAdjacency);
        const availableProductionUnits = (player.production.megacredits + 5) +
            player.production.steel +
            player.production.titanium +
            player.production.plants +
            player.production.energy +
            player.production.heat;
        if (availableProductionUnits >= cost.production && player.canAfford(cost.megacredits)) {
            return cost;
        }
        if (cost.production > 0) {
            throw new Error(`Placing here costs ${cost.production} units of production and ${cost.megacredits} M€`);
        }
        if (cost.megacredits > 0) {
            throw new Error(`Placing here costs ${cost.megacredits} M€`);
        }
        return cost;
    }
    static payAdjacencyAndHazardCosts(player, space, subjectToHazardAdjacency) {
        const cost = this.assertCanPay(player, space, subjectToHazardAdjacency);
        if (cost.production > 0) {
            player.game.defer(new SelectProductionToLoseDeferred_1.SelectProductionToLoseDeferred(player, cost.production));
        }
        if (cost.megacredits > 0) {
            player.game.log('${0} placing a tile here costs ${1} M€', (b) => b.player(player).number(cost.megacredits));
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, cost.megacredits, { title: 'Select how to pay additional placement costs.' }));
        }
    }
    static canCover(space, newTile) {
        if (space.tile === undefined) {
            return true;
        }
        if (AresHandler.hasHazardTile(space) && space.tile.protectedHazard !== true) {
            return true;
        }
        if (space.tile.tileType === TileType_1.TileType.OCEAN && TileType_1.OCEAN_UPGRADE_TILES.has(newTile.tileType)) {
            return true;
        }
        return false;
    }
    static onTemperatureChange(game, aresData) {
        AresHazards_1._AresHazardPlacement.onTemperatureChange(game, aresData);
    }
    static onOceanPlaced(aresData, player) {
        AresHazards_1._AresHazardPlacement.onOceanPlaced(aresData, player);
    }
    static onOxygenChange(game, aresData) {
        AresHazards_1._AresHazardPlacement.onOxygenChange(game, aresData);
    }
    static grantBonusForRemovingHazard(player, initialTileType) {
        if (player.game.phase === Phase_1.Phase.SOLAR) {
            return;
        }
        let steps;
        switch (initialTileType) {
            case TileType_1.TileType.DUST_STORM_MILD:
            case TileType_1.TileType.EROSION_MILD:
                steps = 1;
                break;
            case TileType_1.TileType.DUST_STORM_SEVERE:
            case TileType_1.TileType.EROSION_SEVERE:
                steps = 2;
                break;
            default:
                return;
        }
        player.increaseTerraformRating(steps);
        player.game.log('${0}\'s TR increases ${1} step(s) for removing ${2}', (b) => b.player(player).number(steps).tileType(initialTileType));
    }
    static anyAdjacentSpaceGivesBonus(board, space, bonus) {
        return board.getAdjacentSpaces(space).some((adj) => adj.adjacency?.bonus.includes(bonus));
    }
}
exports.AresHandler = AresHandler;
