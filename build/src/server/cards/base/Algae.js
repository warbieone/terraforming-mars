"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algae = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Algae extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ALGAE,
            tags: [Tag_1.Tag.PLANT],
            cost: 10,
            behavior: {
                production: { plants: 2 },
                stock: { plants: 1 },
            },
            requirements: { oceans: 5 },
            metadata: {
                description: 'Requires 5 ocean tiles. Gain 1 plant and increase your plant production 2 steps.',
                cardNumber: '047',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.plants(2)).plants(1)),
            },
        });
    }
}
exports.Algae = Algae;
