"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Engineer = void 0;
const CardName_1 = require("../../../common/cards/CardName");
class Engineer {
    constructor() {
        this.name = 'Engineer';
        this.description = 'Play the most cards that directly alter your own production';
    }
    getScore(player) {
        const score = player.tableau.filter((card) => {
            var _a;
            if (Engineer.productionCards.includes(card.name))
                return true;
            if (card.produce !== undefined)
                return true;
            const production = (_a = card.behavior) === null || _a === void 0 ? void 0 : _a.production;
            if (production !== undefined) {
                return Object.keys(production).length > 0;
            }
            return false;
        }).length;
        return score;
    }
}
exports.Engineer = Engineer;
Engineer.productionCards = [
    CardName_1.CardName.ARTIFICIAL_PHOTOSYNTHESIS,
    CardName_1.CardName.ASTEROID_MINING_CONSORTIUM,
    CardName_1.CardName.ENERGY_TAPPING,
    CardName_1.CardName.GREAT_ESCARPMENT_CONSORTIUM,
    CardName_1.CardName.INSULATION,
    CardName_1.CardName.NITROGEN_RICH_ASTEROID,
    CardName_1.CardName.POWER_SUPPLY_CONSORTIUM,
    CardName_1.CardName.SATELLITES,
    CardName_1.CardName.COMMUNITY_SERVICES,
    CardName_1.CardName.ECOLOGY_RESEARCH,
    CardName_1.CardName.FLOATER_LEASING,
    CardName_1.CardName.LUNAR_EXPORTS,
    CardName_1.CardName.MINORITY_REFUGE,
    CardName_1.CardName.PIONEER_SETTLEMENT,
    CardName_1.CardName.QUANTUM_COMMUNICATIONS,
    CardName_1.CardName.INTERPLANETARY_TRADE,
    CardName_1.CardName.DARKSIDE_MINING_SYNDICATE,
    CardName_1.CardName.ROVER_DRIVERS_UNION,
    CardName_1.CardName.LUNA_FIRST_INCORPORATED,
    CardName_1.CardName.RARE_EARTH_ELEMENTS,
    CardName_1.CardName.CASSINI_STATION,
    CardName_1.CardName.MICROBIOLOGY_PATENTS,
    CardName_1.CardName.OUMUAMUA_TYPE_OBJECT_SURVEY,
    CardName_1.CardName.RARE_EARTH_ELEMENTS,
    CardName_1.CardName.SMALL_OPEN_PIT_MINE,
];
//# sourceMappingURL=Engineer.js.map