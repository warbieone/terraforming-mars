"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KelpFarming = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class KelpFarming extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.KELP_FARMING,
            tags: [Tag_1.Tag.PLANT],
            cost: 17,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 2, plants: 3 },
                stock: { plants: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(6)),
            metadata: {
                cardNumber: '055',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(2).br;
                        pb.plants(3);
                    }).nbsp.plants(2);
                }),
                description: 'Requires 6 ocean tiles. Increase your M€ production 2 steps and your plant production 3 steps. Gain 2 plants.',
            },
        });
    }
}
exports.KelpFarming = KelpFarming;
//# sourceMappingURL=KelpFarming.js.map