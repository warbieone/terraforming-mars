"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warmonger = void 0;
const CardName_1 = require("../../../common/cards/CardName");
class Warmonger {
    constructor() {
        this.name = 'Warmonger';
        this.description = 'Play the most cards that reduce other players\' resources or production';
    }
    getScore(player) {
        const cardNames = player.playedCards.map((card) => card.name);
        return cardNames.filter((name) => Warmonger.attackCards.includes(name)).length;
    }
}
exports.Warmonger = Warmonger;
Warmonger.attackCards = [
    CardName_1.CardName.ANTS,
    CardName_1.CardName.ASTEROID,
    CardName_1.CardName.ASTEROID_MINING_CONSORTIUM,
    CardName_1.CardName.BIG_ASTEROID,
    CardName_1.CardName.BIOMASS_COMBUSTORS,
    CardName_1.CardName.BIRDS,
    CardName_1.CardName.CLOUD_SEEDING,
    CardName_1.CardName.COMET,
    CardName_1.CardName.DEIMOS_DOWN,
    CardName_1.CardName.ENERGY_TAPPING,
    CardName_1.CardName.FISH,
    CardName_1.CardName.FLOODING,
    CardName_1.CardName.GIANT_ICE_ASTEROID,
    CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
    CardName_1.CardName.HACKERS,
    CardName_1.CardName.HEAT_TRAPPERS,
    CardName_1.CardName.HERBIVORES,
    CardName_1.CardName.HIRED_RAIDERS,
    CardName_1.CardName.MINING_EXPEDITION,
    CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
    CardName_1.CardName.PREDATORS,
    CardName_1.CardName.SABOTAGE,
    CardName_1.CardName.SMALL_ANIMALS,
    CardName_1.CardName.VIRUS,
    CardName_1.CardName.COMET_FOR_VENUS,
    CardName_1.CardName.AIR_RAID,
    CardName_1.CardName.IMPACTOR_SWARM,
    CardName_1.CardName.SUBZERO_SALT_FISH,
    CardName_1.CardName.AERIAL_LENSES,
    CardName_1.CardName.LAW_SUIT,
    CardName_1.CardName.SMALL_ASTEROID,
    CardName_1.CardName.DEIMOS_DOWN_PROMO,
    CardName_1.CardName.MONS_INSURANCE,
    CardName_1.CardName.METALLIC_ASTEROID,
    CardName_1.CardName.DEIMOS_DOWN_ARES,
    CardName_1.CardName.ANCIENT_SHIPYARDS,
    CardName_1.CardName.COSMIC_RADIATION,
    CardName_1.CardName.THE_DARKSIDE_OF_THE_MOON_SYNDICATE,
    CardName_1.CardName.DUST_STORM,
    CardName_1.CardName.SOLAR_STORM,
    CardName_1.CardName.BJORN,
];
//# sourceMappingURL=Warmonger.js.map