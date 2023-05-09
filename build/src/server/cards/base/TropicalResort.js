"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TropicalResort = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TropicalResort extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TROPICAL_RESORT,
            tags: [Tag_1.Tag.BUILDING],
            cost: 13,
            behavior: {
                production: { megacredits: 3, heat: -2 },
            },
            victoryPoints: 2,
            metadata: {
                cardNumber: '098',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().heat(2).br;
                        pb.plus().megacredits(3);
                    });
                }),
                description: 'Reduce your heat production 2 steps and increase your M€ production 3 steps.',
            },
        });
    }
}
exports.TropicalResort = TropicalResort;
