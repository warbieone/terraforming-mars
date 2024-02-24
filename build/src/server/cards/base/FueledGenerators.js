"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FueledGenerators = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class FueledGenerators extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FUELED_GENERATORS,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 1,
            behavior: {
                production: { energy: 1, megacredits: -1 },
            },
            metadata: {
                cardNumber: '100',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(1).br;
                        pb.plus().energy(1);
                    });
                }),
                description: 'Decrease your M€ production 1 step and increase your energy production 1 steps.',
            },
        });
    }
}
exports.FueledGenerators = FueledGenerators;
