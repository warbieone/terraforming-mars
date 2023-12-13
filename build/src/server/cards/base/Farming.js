"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farming = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Farming extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FARMING,
            tags: [Tag_1.Tag.PLANT],
            cost: 16,
            victoryPoints: 2,
            behavior: {
                production: { megacredits: 2, plants: 2 },
                stock: { plants: 2 },
            },
            requirements: { temperature: 4 },
            metadata: {
                cardNumber: '118',
                description: 'Requires +4° C or warmer. Increase your M€ production 2 steps and your plant production 2 steps. Gain 2 plants.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(2).br;
                        pb.plants(2);
                    }).nbsp.plants(2);
                }),
            },
        });
    }
}
exports.Farming = Farming;
//# sourceMappingURL=Farming.js.map