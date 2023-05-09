"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicroMills = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MicroMills extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MICRO_MILLS,
            cost: 3,
            behavior: {
                production: { heat: 1 },
            },
            metadata: {
                cardNumber: '164',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(1));
                }),
                description: 'Increase your heat production 1 step.',
            },
        });
    }
}
exports.MicroMills = MicroMills;
