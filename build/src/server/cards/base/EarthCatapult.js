"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthCatapult = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class EarthCatapult extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.EARTH_CATAPULT,
            tags: [Tag_1.Tag.EARTH],
            cost: 23,
            victoryPoints: 2,
            cardDiscount: { amount: 2 },
            metadata: {
                cardNumber: '070',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a card, you pay 2 M€ less for it.', (eb) => {
                        eb.empty().startEffect.megacredits(-2);
                    });
                }),
            },
        });
    }
}
exports.EarthCatapult = EarthCatapult;
