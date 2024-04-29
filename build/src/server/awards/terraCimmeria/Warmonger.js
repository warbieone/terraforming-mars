"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Warmonger = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
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
        if (card.type === CardType_1.CardType.EVENT) {
            return;
        }
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
    CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
    CardName_1.CardName.HACKERS,
    CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
    CardName_1.CardName.PREDATORS,
    CardName_1.CardName.MONS_INSURANCE,
    CardName_1.CardName.ANCIENT_SHIPYARDS,
    CardName_1.CardName.THE_DARKSIDE_OF_THE_MOON_SYNDICATE,
    CardName_1.CardName.BJORN,
    CardName_1.CardName.CLONE_TROOPERS,
    CardName_1.CardName.CLASS_ACTION_LAWSUIT,
    CardName_1.CardName.HACKERS_UNDERWORLD,
    CardName_1.CardName.INVESTIGATIVE_JOURNALISM,
    CardName_1.CardName.SPACE_PRIVATEERS,
];
