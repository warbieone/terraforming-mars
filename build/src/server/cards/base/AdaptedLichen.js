"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptedLichen = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AdaptedLichen extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ADAPTED_LICHEN,
            tags: [Tag_1.Tag.PLANT],
            cost: 9,
            behavior: {
                production: { plants: 1 },
            },
            metadata: {
                description: 'Increase your plant production 1 step.',
                cardNumber: '048',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.plants(1))),
            },
        });
    }
}
exports.AdaptedLichen = AdaptedLichen;
