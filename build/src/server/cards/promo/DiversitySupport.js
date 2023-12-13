"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiversitySupport = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class DiversitySupport extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DIVERSITY_SUPPORT,
            tags: [],
            cost: 1,
            behavior: {
                tr: 1,
            },
            requirements: { resourceTypes: 9 },
            metadata: {
                cardNumber: 'X20',
                description: 'Requires that you have 9 different types of resources. Gain 1 TR.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.tr(1)),
            },
        });
    }
}
exports.DiversitySupport = DiversitySupport;
//# sourceMappingURL=DiversitySupport.js.map