"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignedOrganisms = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
class DesignedOrganisms extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DESIGNED_ORGANISMS,
            cost: 13,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.PLANT, Tag_1.Tag.MARS],
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 5 },
            behavior: {
                production: { plants: 2 },
                stock: { plants: 3 },
                addResourcesToAnyCard: [
                    { count: 3, type: CardResource_1.CardResource.MICROBE },
                    { count: 1, type: CardResource_1.CardResource.ANIMAL },
                ],
            },
            metadata: {
                cardNumber: 'Pf23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(2)).plants(3).br;
                    b.microbes(3).asterix().animals(1).asterix();
                }),
                description: 'Requires 5 science tags. Increase your plant production 2 steps. Gain 3 plants. ' +
                    'Add 3 microbes to ANY card. Add 1 animal to ANY card.',
            },
        });
    }
}
exports.DesignedOrganisms = DesignedOrganisms;
