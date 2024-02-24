"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sponsors = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Sponsors extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SPONSORS,
            tags: [Tag_1.Tag.EARTH],
            cost: 6,
            behavior: {
                production: { megacredits: 2 },
            },
            metadata: {
                cardNumber: '068',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2));
                }),
                description: 'Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.Sponsors = Sponsors;
