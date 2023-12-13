"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AntiGravityTechnology = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AntiGravityTechnology extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ANTI_GRAVITY_TECHNOLOGY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 14,
            victoryPoints: 3,
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 7 },
            cardDiscount: { amount: 2 },
            metadata: {
                description: 'Requires 7 science tags.',
                cardNumber: '150',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a card, you pay 2 M€ less for it.', (be) => be.empty().startEffect.megacredits(-2));
                }),
            },
        });
    }
}
exports.AntiGravityTechnology = AntiGravityTechnology;
//# sourceMappingURL=AntiGravityTechnology.js.map