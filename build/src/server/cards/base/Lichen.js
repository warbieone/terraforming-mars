"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lichen = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Lichen extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LICHEN,
            tags: [Tag_1.Tag.PLANT],
            cost: 7,
            behavior: {
                production: { plants: 1 },
            },
            requirements: { temperature: -24 },
            metadata: {
                cardNumber: '159',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1));
                }),
                description: 'Requires -24 C or warmer. Increase your plant production 1 step.',
            },
        });
    }
}
exports.Lichen = Lichen;
