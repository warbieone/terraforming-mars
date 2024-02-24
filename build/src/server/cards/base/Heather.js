"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Heather = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Heather extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HEATHER,
            tags: [Tag_1.Tag.PLANT],
            cost: 6,
            behavior: {
                production: { plants: 1 },
                stock: { plants: 1 },
            },
            requirements: { temperature: -14 },
            metadata: {
                cardNumber: '178',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).plants(1);
                }),
                description: 'Requires -14 C° or warmer. Increase your plant production 1 step. Gain 1 plant.',
            },
        });
    }
}
exports.Heather = Heather;
