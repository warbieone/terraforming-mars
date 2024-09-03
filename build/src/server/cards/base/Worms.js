"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worms = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Worms extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.WORMS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 8,
            behavior: {
                production: { plants: { tag: Tag_1.Tag.MICROBE, per: 2 } },
            },
            requirements: { oxygen: 4 },
            metadata: {
                cardNumber: '130',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1).slash().tag(Tag_1.Tag.MICROBE, 2));
                }),
                description: 'Requires 4% oxygen. Increase your plant production 1 step for every 2 microbe tags you have, including this.',
            },
        });
    }
}
exports.Worms = Worms;
