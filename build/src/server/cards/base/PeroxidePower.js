"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeroxidePower = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class PeroxidePower extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PEROXIDE_POWER,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 7,
            behavior: {
                production: { energy: 2, megacredits: -1 },
            },
            metadata: {
                cardNumber: '089',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(1).br;
                        pb.plus().energy(2);
                    });
                }),
                description: 'Decrease your M€ production 1 step and increase your energy production 2 steps.',
            },
        });
    }
}
exports.PeroxidePower = PeroxidePower;
