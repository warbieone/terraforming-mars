"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GHGProducingBacteria = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class GHGProducingBacteria extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.GHG_PRODUCING_BACTERIA,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MICROBE],
            cost: 8,
            resourceType: CardResource_1.CardResource.MICROBE,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(4)),
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            spend: { resourcesHere: 2 },
                            global: { temperature: 1 },
                            title: 'Remove 2 microbes to raise temperature 1 step',
                        },
                        {
                            addResources: 1,
                            title: 'Add 1 microbe to this card',
                        },
                    ],
                },
            },
            metadata: {
                description: 'Requires 4% oxygen.',
                cardNumber: '034',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.or().br;
                    b.action('Remove 2 microbes to raise temperature 1 step.', (eb) => {
                        eb.microbes(2).startAction.temperature(1);
                    });
                }),
            },
        });
    }
}
exports.GHGProducingBacteria = GHGProducingBacteria;
