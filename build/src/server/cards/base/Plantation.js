"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plantation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class Plantation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.PLANTATION,
            tags: [Tag_1.Tag.PLANT],
            cost: 15,
            tr: { oxygen: 1 },
            behavior: {
                greenery: {},
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: '193',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.greenery();
                }),
                description: 'Requires 2 science tags. Place a greenery tile and raise oxygen 1 step.',
            },
        });
    }
}
exports.Plantation = Plantation;
//# sourceMappingURL=Plantation.js.map