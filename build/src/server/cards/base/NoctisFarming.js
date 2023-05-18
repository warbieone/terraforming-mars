"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoctisFarming = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class NoctisFarming extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.NOCTIS_FARMING,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            cost: 10,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-20)),
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 1 },
                stock: { plants: 2 },
            },
            metadata: {
                cardNumber: '176',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(1);
                    }).nbsp.plants(2);
                }),
                description: 'Requires -20 C or warmer. Increase your M€ production 1 step and gain 2 plants.',
            },
        });
    }
}
exports.NoctisFarming = NoctisFarming;
//# sourceMappingURL=NoctisFarming.js.map