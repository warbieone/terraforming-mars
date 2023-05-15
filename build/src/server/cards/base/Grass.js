"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grass = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class Grass extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GRASS,
            tags: [Tag_1.Tag.PLANT],
            cost: 11,
            behavior: {
                production: { plants: 1 },
                stock: { plants: 3 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-16)),
            metadata: {
                cardNumber: '087',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).plants(3);
                }),
                description: 'Requires -16° C or warmer. Increase your plant production 1 step. Gain 3 plants.',
            },
        });
    }
}
exports.Grass = Grass;
//# sourceMappingURL=Grass.js.map