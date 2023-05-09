"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodFactory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class FoodFactory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FOOD_FACTORY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 12,
            behavior: {
                production: { megacredits: 4, plants: -1 },
            },
            victoryPoints: 1,
            metadata: {
                cardNumber: '041',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().plants(1).br;
                        pb.plus().megacredits(4);
                    });
                }),
                description: 'Decrease your plant production 1 step and increase your M€ production 4 steps',
            },
        });
    }
}
exports.FoodFactory = FoodFactory;
