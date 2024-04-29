"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engineer = exports.BESPOKE_PRODUCTION_CARDS = void 0;
const CardName_1 = require("../../../common/cards/CardName");
exports.BESPOKE_PRODUCTION_CARDS = [
    CardName_1.CardName.ARTIFICIAL_PHOTOSYNTHESIS,
    CardName_1.CardName.ASTEROID_MINING_CONSORTIUM,
    CardName_1.CardName.ENERGY_TAPPING,
    CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
    CardName_1.CardName.INSULATION,
    CardName_1.CardName.NITROGEN_RICH_ASTEROID,
    CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
    CardName_1.CardName.COMMUNITY_SERVICES,
    CardName_1.CardName.ECOLOGY_RESEARCH,
    CardName_1.CardName.LUNAR_EXPORTS,
    CardName_1.CardName.MINORITY_REFUGE,
    CardName_1.CardName.PIONEER_SETTLEMENT,
    CardName_1.CardName.QUANTUM_COMMUNICATIONS,
    CardName_1.CardName.INTERPLANETARY_TRADE,
    CardName_1.CardName.DARKSIDE_MINING_SYNDICATE,
    CardName_1.CardName.ROVER_DRIVERS_UNION,
    CardName_1.CardName.LUNA_FIRST_INCORPORATED,
    CardName_1.CardName.RARE_EARTH_ELEMENTS,
    CardName_1.CardName.MICROBIOLOGY_PATENTS,
    CardName_1.CardName.OUMUAMUA_TYPE_OBJECT_SURVEY,
    CardName_1.CardName.SMALL_OPEN_PIT_MINE,
];
const map = new Map(exports.BESPOKE_PRODUCTION_CARDS.map((name) => [name, true]));
class Engineer {
    constructor() {
        this.name = 'Engineer';
        this.description = 'Have the most cards in play that directly alter your own production';
    }
    getScore(player) {
        return player.tableau.filter((card) => {
            const eligible = map.get(card.name);
            if (eligible !== undefined) {
                return eligible;
            }
            const val = Engineer.autoInclude(card);
            map.set(card.name, val);
            return val;
        }).length;
    }
    static autoInclude(card) {
        if (card.productionBox !== undefined) {
            return true;
        }
        const production = card.behavior?.production;
        if (production !== undefined) {
            return Object.keys(production).length > 0;
        }
        return false;
    }
}
exports.Engineer = Engineer;
