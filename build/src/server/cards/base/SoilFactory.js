"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoilFactory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SoilFactory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SOIL_FACTORY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 9,
            behavior: {
                production: { energy: -1, plants: 1 },
            },
            victoryPoints: 1,
            metadata: {
                cardNumber: '179',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().plants(1);
                    });
                }),
                description: 'Decrease your energy production 1 step and increase your plant production 1 step.',
            },
        });
    }
}
exports.SoilFactory = SoilFactory;
