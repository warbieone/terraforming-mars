"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreathingFilters = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
class BreathingFilters extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BREATHING_FILTERS,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 11,
            victoryPoints: 2,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(7)),
            metadata: {
                description: 'Requires 7% oxygen.',
                cardNumber: '114',
            },
        });
    }
}
exports.BreathingFilters = BreathingFilters;
//# sourceMappingURL=BreathingFilters.js.map