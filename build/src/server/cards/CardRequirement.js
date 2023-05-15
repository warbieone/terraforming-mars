"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyCardRequirement = exports.ProductionCardRequirement = exports.TagCardRequirement = exports.CardRequirement = void 0;
const RequirementType_1 = require("../../common/cards/RequirementType");
const Tag_1 = require("../../common/cards/Tag");
const Resource_1 = require("../../common/Resource");
const CardResource_1 = require("../../common/CardResource");
const TileType_1 = require("../../common/TileType");
const GlobalParameter_1 = require("../../common/GlobalParameter");
const MoonExpansion_1 = require("../moon/MoonExpansion");
const Turmoil_1 = require("../turmoil/Turmoil");
class CardRequirement {
    constructor(type, amount = 1, options) {
        var _a, _b;
        this.type = type;
        this.amount = amount;
        this.isMax = false;
        this.isAny = false;
        this.text = undefined;
        this.isMax = (_a = options === null || options === void 0 ? void 0 : options.max) !== null && _a !== void 0 ? _a : false;
        this.isAny = (_b = options === null || options === void 0 ? void 0 : options.all) !== null && _b !== void 0 ? _b : false;
        this.text = options === null || options === void 0 ? void 0 : options.text;
    }
    satisfiesInequality(calculated) {
        if (this.isMax) {
            return calculated <= this.amount;
        }
        return calculated >= this.amount;
    }
    satisfies(player) {
        switch (this.type) {
            case RequirementType_1.RequirementType.CHAIRMAN:
                return Turmoil_1.Turmoil.getTurmoil(player.game).chairman === player.id;
            case RequirementType_1.RequirementType.CITIES:
                return this.satisfiesInequality(player.game.getCitiesCount(this.isAny ? undefined : player));
            case RequirementType_1.RequirementType.COLONIES:
                const coloniesCount = player.game.colonies.map((colony) => colony.colonies.filter((owner) => owner === player.id).length)
                    .reduce((sum, colonyCount) => sum + colonyCount);
                return this.satisfiesInequality(coloniesCount);
            case RequirementType_1.RequirementType.FLOATERS:
                return this.satisfiesInequality(player.getResourceCount(CardResource_1.CardResource.FLOATER));
            case RequirementType_1.RequirementType.GREENERIES:
                return this.satisfiesInequality(player.game.getGreeneriesCount(this.isAny ? undefined : player));
            case RequirementType_1.RequirementType.PARTY_LEADERS:
                const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
                const parties = turmoil.parties.filter((party) => party.partyLeader === player.id).length;
                return this.satisfiesInequality(parties);
            case RequirementType_1.RequirementType.OCEANS:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.OCEANS);
            case RequirementType_1.RequirementType.OXYGEN:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.OXYGEN);
            case RequirementType_1.RequirementType.TEMPERATURE:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.TEMPERATURE);
            case RequirementType_1.RequirementType.VENUS:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.VENUS);
            case RequirementType_1.RequirementType.TR:
                return this.satisfiesInequality(player.getTerraformRating());
            case RequirementType_1.RequirementType.REMOVED_PLANTS:
                return player.game.someoneHasRemovedOtherPlayersPlants;
            case RequirementType_1.RequirementType.GENERATION:
                return this.satisfiesInequality(player.game.getGeneration());
            case RequirementType_1.RequirementType.RESOURCE_TYPES:
                const standardResources = Resource_1.ALL_RESOURCES.filter((res) => player.getResource(res) > 0).length;
                const nonStandardResources = new Set(player.getCardsWithResources().map((card) => card.resourceType)).size;
                return this.satisfiesInequality(standardResources + nonStandardResources);
            case RequirementType_1.RequirementType.HABITAT_RATE:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.MOON_HABITAT_RATE);
            case RequirementType_1.RequirementType.MINING_RATE:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.MOON_MINING_RATE);
            case RequirementType_1.RequirementType.LOGISTIC_RATE:
                return this.checkGlobalRequirement(player, GlobalParameter_1.GlobalParameter.MOON_LOGISTICS_RATE);
            case RequirementType_1.RequirementType.HABITAT_TILES:
                return this.satisfiesInequality(MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_HABITAT, { surfaceOnly: true, ownedBy: this.isAny ? undefined : player }).length);
            case RequirementType_1.RequirementType.MINING_TILES:
                return this.satisfiesInequality(MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_MINE, { surfaceOnly: true, ownedBy: this.isAny ? undefined : player }).length);
            case RequirementType_1.RequirementType.ROAD_TILES:
                return this.satisfiesInequality(MoonExpansion_1.MoonExpansion.spaces(player.game, TileType_1.TileType.MOON_ROAD, { surfaceOnly: true, ownedBy: this.isAny ? undefined : player }).length);
            case RequirementType_1.RequirementType.TAG:
            case RequirementType_1.RequirementType.PARTY:
            case RequirementType_1.RequirementType.PRODUCTION:
                throw new Error(`Use subclass satisfies() for requirement type ${this.type}`);
        }
    }
    checkGlobalRequirement(player, parameter) {
        let currentLevel;
        let playerRequirementsBonus = player.getRequirementsBonus(parameter);
        switch (parameter) {
            case GlobalParameter_1.GlobalParameter.OCEANS:
                currentLevel = player.game.board.getOceanCount({ upgradedOceans: true, wetlands: true });
                break;
            case GlobalParameter_1.GlobalParameter.OXYGEN:
                currentLevel = player.game.getOxygenLevel();
                break;
            case GlobalParameter_1.GlobalParameter.TEMPERATURE:
                currentLevel = player.game.getTemperature();
                playerRequirementsBonus *= 2;
                break;
            case GlobalParameter_1.GlobalParameter.VENUS:
                currentLevel = player.game.getVenusScaleLevel();
                playerRequirementsBonus *= 2;
                break;
            case GlobalParameter_1.GlobalParameter.MOON_HABITAT_RATE:
                currentLevel = MoonExpansion_1.MoonExpansion.moonData(player.game).colonyRate;
                break;
            case GlobalParameter_1.GlobalParameter.MOON_MINING_RATE:
                currentLevel = MoonExpansion_1.MoonExpansion.moonData(player.game).miningRate;
                break;
            case GlobalParameter_1.GlobalParameter.MOON_LOGISTICS_RATE:
                currentLevel = MoonExpansion_1.MoonExpansion.moonData(player.game).logisticRate;
                break;
            default:
                console.warn(`Unknown GlobalParameter provided: ${parameter}`);
                return false;
        }
        if (this.isMax) {
            return currentLevel <= this.amount + playerRequirementsBonus;
        }
        else {
            return currentLevel >= this.amount - playerRequirementsBonus;
        }
    }
}
exports.CardRequirement = CardRequirement;
class TagCardRequirement extends CardRequirement {
    constructor(tag, amount, options) {
        super(RequirementType_1.RequirementType.TAG, amount, options);
        this.tag = tag;
    }
    satisfies(player) {
        const mode = this.isMax !== true ? 'default' : 'raw';
        let tagCount = player.tags.count(this.tag, mode);
        if (this.isAny) {
            player.game.getPlayers().forEach((p) => {
                if (p.id !== player.id) {
                    tagCount += p.tags.count(this.tag, 'raw');
                }
            });
        }
        if (this.tag === Tag_1.Tag.SCIENCE && player.hasTurmoilScienceTagBonus)
            tagCount += 1;
        return this.satisfiesInequality(tagCount);
    }
}
exports.TagCardRequirement = TagCardRequirement;
class ProductionCardRequirement extends CardRequirement {
    constructor(resource, amount, options) {
        super(RequirementType_1.RequirementType.PRODUCTION, amount, options);
        this.resource = resource;
    }
    satisfies(player) {
        return this.satisfiesInequality(player.production[this.resource]);
    }
}
exports.ProductionCardRequirement = ProductionCardRequirement;
class PartyCardRequirement extends CardRequirement {
    constructor(party) {
        super(RequirementType_1.RequirementType.PARTY);
        this.party = party;
    }
    satisfies(player) {
        return Turmoil_1.Turmoil.getTurmoil(player.game).canPlay(player, this.party);
    }
}
exports.PartyCardRequirement = PartyCardRequirement;
//# sourceMappingURL=CardRequirement.js.map