"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mangrove = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class Mangrove extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MANGROVE,
            tags: [Tag_1.Tag.PLANT],
            cost: 12,
            tr: { oxygen: 1 },
            victoryPoints: 1,
            behavior: {
                greenery: { on: 'ocean' },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(4)),
            metadata: {
                cardNumber: '059',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.greenery(Size_1.Size.MEDIUM).asterix()),
                description: 'Requires +4 C or warmer. Place a greenery tile ON AN AREA RESERVED FOR OCEAN and raise oxygen 1 step. Disregard normal placement restrictions for this.',
            },
        });
    }
}
exports.Mangrove = Mangrove;
//# sourceMappingURL=Mangrove.js.map