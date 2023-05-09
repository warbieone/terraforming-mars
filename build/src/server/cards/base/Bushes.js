"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bushes = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class Bushes extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BUSHES,
            tags: [Tag_1.Tag.PLANT],
            cost: 10,
            behavior: {
                production: { plants: 2 },
                stock: { plants: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-10)),
            metadata: {
                cardNumber: '093',
                description: 'Requires -10 C or warmer. Increase your plant production 2 steps. Gain 2 plants.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(2);
                    }).plants(2);
                }),
            },
        });
    }
}
exports.Bushes = Bushes;
