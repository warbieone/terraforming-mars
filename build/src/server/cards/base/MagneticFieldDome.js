"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagneticFieldDome = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MagneticFieldDome extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MAGNETIC_FIELD_DOME,
            tags: [Tag_1.Tag.BUILDING],
            cost: 5,
            behavior: {
                production: { energy: -2, plants: 1 },
                tr: 1,
            },
            metadata: {
                cardNumber: '171',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(2).br;
                        pb.plus().plants(1);
                    });
                    b.tr(1);
                }),
                description: 'Decrease your energy production 2 steps and increase your plant production 1 step. Raise your TR 1 step.',
            },
        });
    }
}
exports.MagneticFieldDome = MagneticFieldDome;
