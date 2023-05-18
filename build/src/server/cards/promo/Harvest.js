"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Harvest = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
class Harvest extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.HARVEST,
            tags: [Tag_1.Tag.PLANT],
            cost: 4,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.greeneries(3)),
            behavior: {
                stock: { megacredits: 12 },
            },
            metadata: {
                cardNumber: 'X37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(12);
                }),
                description: 'Requires that you have 3 greenery tiles in play. Gain 12 M€.',
            },
        });
    }
}
exports.Harvest = Harvest;
//# sourceMappingURL=Harvest.js.map