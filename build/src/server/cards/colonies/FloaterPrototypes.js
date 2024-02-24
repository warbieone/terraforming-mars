"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloaterPrototypes = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class FloaterPrototypes extends Card_1.Card {
    constructor() {
        super({
            cost: 2,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.FLOATER_PROTOTYPES,
            type: CardType_1.CardType.EVENT,
            behavior: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 2 },
            },
            metadata: {
                cardNumber: 'C11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.floaters(2).asterix()),
                description: 'Add two floaters to ANOTHER card.',
            },
        });
    }
}
exports.FloaterPrototypes = FloaterPrototypes;
