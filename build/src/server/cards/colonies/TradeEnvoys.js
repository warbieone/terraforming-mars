"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeEnvoys = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
class TradeEnvoys extends Card_1.Card {
    constructor() {
        super({
            cost: 6,
            name: CardName_1.CardName.TRADE_ENVOYS,
            type: CardType_1.CardType.ACTIVE,
            behavior: {
                colonies: { tradeOffset: 1 },
            },
            metadata: {
                cardNumber: 'C46',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you trade, you may first increase that Colony Tile track 1 step.', (eb) => {
                        eb.trade().startEffect.text('+1', Size_1.Size.LARGE);
                    });
                }),
            },
        });
    }
}
exports.TradeEnvoys = TradeEnvoys;
