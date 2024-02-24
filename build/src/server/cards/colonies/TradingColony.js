"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
class TradingColony extends Card_1.Card {
    constructor() {
        super({
            cost: 18,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.TRADING_COLONY,
            type: CardType_1.CardType.ACTIVE,
            behavior: {
                colonies: {
                    buildColony: {},
                    tradeOffset: 1,
                },
            },
            metadata: {
                cardNumber: 'C47',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you trade, you may first increase that Colony Tile track 1 step.', (eb) => {
                        eb.trade().startEffect.text('+1', Size_1.Size.LARGE);
                    }).br;
                    b.colonies(1);
                }),
                description: 'Place a colony.',
            },
        });
    }
}
exports.TradingColony = TradingColony;
