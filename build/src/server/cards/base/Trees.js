"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trees = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class Trees extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TREES,
            tags: [Tag_1.Tag.PLANT],
            cost: 13,
            victoryPoints: 1,
            behavior: {
                production: { plants: 3 },
                stock: { plants: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-4)),
            metadata: {
                cardNumber: '060',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(3)).plants(1);
                }),
                description: 'Requires -4 C or warmer. Increase your plant production 3 steps. Gain 1 plant.',
            },
        });
    }
}
exports.Trees = Trees;
