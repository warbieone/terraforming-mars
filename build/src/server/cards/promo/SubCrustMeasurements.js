"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCrustMeasurements = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class SubCrustMeasurements extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SUB_CRUST_MEASUREMENTS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING, Tag_1.Tag.EARTH],
            cost: 20,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            victoryPoints: 2,
            action: {
                drawCard: 1,
            },
            metadata: {
                cardNumber: 'X29',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Draw a card.', (eb) => {
                        eb.empty().startAction.cards(1);
                    });
                }),
                description: 'Requires 2 science tags.',
            },
        });
    }
}
exports.SubCrustMeasurements = SubCrustMeasurements;
//# sourceMappingURL=SubCrustMeasurements.js.map