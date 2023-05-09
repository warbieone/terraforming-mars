"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripMine = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class StripMine extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.STRIP_MINE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 25,
            behavior: {
                production: { energy: -2, steel: 2, titanium: 1 },
                global: { oxygen: 2 },
            },
            metadata: {
                cardNumber: '138',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(2).br;
                        pb.plus().steel(2).titanium(1);
                    }).br;
                    b.oxygen(2);
                }),
                description: 'Decrease your energy production 2 steps. Increase your steel production 2 steps and your titanium production 1 step. Raise oxygen 2 steps.',
            },
        });
    }
}
exports.StripMine = StripMine;
