"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlledBloom = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
class ControlledBloom extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CONTROLLED_BLOOM,
            cost: 13,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.PLANT],
            victoryPoints: 1,
            requirements: { oceans: 3 },
            behavior: {
                stock: { plants: 3 },
                addResourcesToAnyCard: { count: 3, type: CardResource_1.CardResource.MICROBE },
            },
            metadata: {
                cardNumber: 'PFTmp',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.resource(CardResource_1.CardResource.MICROBE, 3).asterix().br;
                    b.plants(3);
                }),
                description: 'Requires 3 oceans. Add 3 microbes to ANY card. Gain 3 plants.',
            },
        });
    }
}
exports.ControlledBloom = ControlledBloom;
