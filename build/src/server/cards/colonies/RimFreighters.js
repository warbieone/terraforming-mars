"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RimFreighters = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class RimFreighters extends Card_1.Card {
    constructor() {
        super({
            cost: 4,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.RIM_FREIGHTERS,
            type: CardType_1.CardType.ACTIVE,
            behavior: {
                colonies: { tradeDiscount: 1 },
            },
            metadata: {
                cardNumber: 'C35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you trade, you pay 1 less resource for it.', (eb) => {
                        eb.trade().startEffect.tradeDiscount(1);
                    });
                }),
            },
        });
    }
}
exports.RimFreighters = RimFreighters;
