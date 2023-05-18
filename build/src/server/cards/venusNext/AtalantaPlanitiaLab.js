"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtalantaPlanitiaLab = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class AtalantaPlanitiaLab extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ATALANTA_PLANITIA_LAB,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.SCIENCE],
            cost: 10,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            victoryPoints: 2,
            behavior: {
                drawCard: 2,
            },
            metadata: {
                cardNumber: '216',
                description: 'Requires 3 science tags. Draw 2 cards.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.cards(2)),
            },
        });
    }
}
exports.AtalantaPlanitiaLab = AtalantaPlanitiaLab;
//# sourceMappingURL=AtalantaPlanitiaLab.js.map