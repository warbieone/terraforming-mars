"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TundraFarming = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class TundraFarming extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TUNDRA_FARMING,
            tags: [Tag_1.Tag.PLANT],
            cost: 16,
            victoryPoints: 2,
            behavior: {
                production: { plants: 1, megacredits: 2 },
                stock: { plants: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-6)),
            metadata: {
                cardNumber: '169',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(1).megacredits(2);
                    }).plants(1);
                }),
                description: 'Requires -6° C or warmer. Increase your plant production 1 step and your M€ production 2 steps. Gain 1 plant.',
            },
        });
    }
}
exports.TundraFarming = TundraFarming;
//# sourceMappingURL=TundraFarming.js.map