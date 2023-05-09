"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagneticFieldGenerators = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MagneticFieldGenerators extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MAGNETIC_FIELD_GENERATORS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 20,
            behavior: {
                production: { energy: -4, plants: 2 },
                tr: 3,
            },
            metadata: {
                cardNumber: '165',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(4, { digit: Options_1.digit }).br;
                        pb.plus().plants(2);
                    }).br;
                    b.tr(3);
                }),
                description: 'Decrease your energy production 4 steps and increase your plant production 2 steps. Raise your TR 3 steps.',
            },
        });
    }
}
exports.MagneticFieldGenerators = MagneticFieldGenerators;
