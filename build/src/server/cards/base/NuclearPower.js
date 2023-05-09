"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuclearPower = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class NuclearPower extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.NUCLEAR_POWER,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 10,
            behavior: {
                production: { energy: 3, megacredits: -2 },
            },
            metadata: {
                cardNumber: '045',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(2).br;
                        pb.plus().energy(3);
                    });
                }),
                description: 'Decrease your M€ production 2 steps and increase your energy production 3 steps.',
            },
        });
    }
}
exports.NuclearPower = NuclearPower;
