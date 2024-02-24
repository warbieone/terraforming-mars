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
        const score = player.tableau.filter((card) => {
            if (Warmonger.attackCards.includes(card.name))
                return true;
            return Warmonger.autoInclude(card);
        }).length;
        return score;
    }
    static autoInclude(card) {
        if (card.behavior !== undefined) {
            const behavior = card.behavior;
            if (behavior.removeAnyPlants !== undefined)
                return true;
            if (behavior.decreaseAnyProduction !== undefined)
                return true;
        }
        return false;
    }
}
exports.Warmonger = Warmonger;
Warmonger.attackCards = [
    CardName_1.CardName.ANTS,
    CardName_1.CardName.ASTEROID_MINING_CONSORTIUM,
    CardName_1.CardName.ENERGY_TAPPING,
    CardName_1.CardName.FLOODING,
    CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
    CardName_1.CardName.HACKERS,
    CardName_1.CardName.HIRED_RAIDERS,
    CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
    CardName_1.CardName.PREDATORS,
    CardName_1.CardName.SABOTAGE,
    CardName_1.CardName.COMET_FOR_VENUS,
    CardName_1.CardName.AIR_RAID,
    CardName_1.CardName.LAW_SUIT,
    CardName_1.CardName.MONS_INSURANCE,
    CardName_1.CardName.ANCIENT_SHIPYARDS,
    CardName_1.CardName.COSMIC_RADIATION,
    CardName_1.CardName.THE_DARKSIDE_OF_THE_MOON_SYNDICATE,
    CardName_1.CardName.REVOLTING_COLONISTS,
    CardName_1.CardName.DUST_STORM,
    CardName_1.CardName.SOLAR_STORM,
    CardName_1.CardName.PUBLIC_SPONSORED_GRANT,
    CardName_1.CardName.BJORN,
    CardName_1.CardName.CLONE_TROOPERS,
    CardName_1.CardName.ANTI_TRUST_CRACKDOWN,
    CardName_1.CardName.CLASS_ACTION_LAWSUIT,
    CardName_1.CardName.CORPORATE_BLACKMAIL,
    CardName_1.CardName.HACKERS_UNDERWORLD,
    CardName_1.CardName.HIRED_RAIDERS_UNDERWORLD,
    CardName_1.CardName.INVESTIGATIVE_JOURNALISM,
    CardName_1.CardName.MONOPOLY,
    CardName_1.CardName.PLANT_TAX,
    CardName_1.CardName.RECKLESS_DETONATION,
    CardName_1.CardName.SERVER_SABOTAGE,
    CardName_1.CardName.SPACE_PRIVATEERS,
    CardName_1.CardName.SUBNAUTIC_PIRATES,
];
