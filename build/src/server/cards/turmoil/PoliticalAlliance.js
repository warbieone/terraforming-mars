"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticalAlliance = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class PoliticalAlliance extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.POLITICAL_ALLIANCE,
            cost: 4,
            behavior: {
                tr: 1,
            },
            requirements: { partyLeader: 2 },
            metadata: {
                cardNumber: 'X09',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1);
                }),
                description: 'Requires that you have 2 party leaders. Gain 1 TR.',
            },
        });
    }
}
exports.PoliticalAlliance = PoliticalAlliance;
//# sourceMappingURL=PoliticalAlliance.js.map