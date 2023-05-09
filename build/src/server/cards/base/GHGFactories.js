"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHGFactories = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class GHGFactories extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GHG_FACTORIES,
            tags: [Tag_1.Tag.BUILDING],
            cost: 11,
            behavior: {
                production: { energy: -1, heat: 4 },
            },
            metadata: {
                cardNumber: '126',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().heat(4, { digit: Options_1.digit });
                    });
                }),
                description: 'Decrease your energy production 1 step and increase your heat production 4 steps.',
            },
        });
    }
}
exports.GHGFactories = GHGFactories;
