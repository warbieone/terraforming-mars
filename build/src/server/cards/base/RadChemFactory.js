"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadChemFactory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class RadChemFactory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RAD_CHEM_FACTORY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 8,
            behavior: {
                production: { energy: -1 },
                tr: 2,
            },
            metadata: {
                cardNumber: '205',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().energy(1)).br;
                    b.tr(2);
                }),
                description: 'Decrease your energy production 1 step. Raise your TR 2 steps.',
            },
        });
    }
}
exports.RadChemFactory = RadChemFactory;
