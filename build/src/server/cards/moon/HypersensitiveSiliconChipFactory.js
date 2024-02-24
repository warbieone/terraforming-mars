"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HypersensitiveSiliconChipFactory = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class HypersensitiveSiliconChipFactory extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HYPERSENSITIVE_SILICON_CHIP_FACTORY,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 11,
            behavior: {
                production: { megacredits: 4 },
            },
            requirements: { miningTiles: 2, all: Options_1.all },
            reserveUnits: { titanium: 2 },
            metadata: {
                description: 'Requires 2 mining tiles on The Moon. Spend 2 titanium. Increase your M€ production 4 steps.',
                cardNumber: 'M43',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).nbsp;
                    b.production((pb) => pb.megacredits(4)).br;
                }),
            },
        });
    }
}
exports.HypersensitiveSiliconChipFactory = HypersensitiveSiliconChipFactory;
