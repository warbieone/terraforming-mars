"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryoSleep = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class CryoSleep extends Card_1.Card {
    constructor() {
        super({
            cost: 10,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.CRYO_SLEEP,
            type: CardType_1.CardType.ACTIVE,
            victoryPoints: 1,
            behavior: {
                colonies: { tradeDiscount: 1 },
            },
            metadata: {
                cardNumber: 'C07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.effect('When you trade, you pay 1 less resource for it.', (be) => {
                    be.trade().startEffect.tradeDiscount(1);
                })),
            },
        });
    }
}
exports.CryoSleep = CryoSleep;
