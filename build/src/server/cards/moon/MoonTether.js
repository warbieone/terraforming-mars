"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonTether = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class MoonTether extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MOON_TETHER,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.SPACE],
            cost: 18,
            victoryPoints: 1,
            requirements: { tag: Tag_1.Tag.SPACE, count: 6 },
            cardDiscount: { amount: 2 },
            metadata: {
                cardNumber: 'M90',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a card, you pay 2 M€ less for it.', (eb) => {
                        eb.empty().startEffect.megacredits(-2);
                    }).br;
                }),
                description: 'Requires 6 space tags.',
            },
        });
    }
}
exports.MoonTether = MoonTether;
//# sourceMappingURL=MoonTether.js.map