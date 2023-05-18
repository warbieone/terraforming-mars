"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeclarationOfIndependence = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../requirements/CardRequirements");
class DeclarationOfIndependence extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DECLARATION_OF_INDEPENDENCE,
            cost: 20,
            tags: [Tag_1.Tag.MARS],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.MARS, 6)),
            victoryPoints: 4,
            behavior: {
                turmoil: { sendDelegates: { count: 2 } },
            },
            metadata: {
                cardNumber: 'Pf34',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.delegates(2).asterix),
                description: 'Requires that you have at least 6 Mars tags in play. Place 2 delegates in any party.',
            },
        });
    }
}
exports.DeclarationOfIndependence = DeclarationOfIndependence;
//# sourceMappingURL=DeclarationOfIndependence.js.map