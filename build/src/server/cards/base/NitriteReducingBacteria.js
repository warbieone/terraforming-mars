"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitriteReducingBacteria = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class NitriteReducingBacteria extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.NITRITE_REDUCING_BACTERIA,
            tags: [Tag_1.Tag.MICROBE],
            cost: 11,
            resourceType: CardResource_1.CardResource.MICROBE,
            behavior: {
                addResources: 3,
            },
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            spend: { resourcesHere: 3 },
                            tr: 1,
                            title: 'Remove 3 microbes to increase your terraform rating 1 step',
                        },
                        {
                            addResources: 1,
                            title: 'Add 1 microbe to this card',
                        },
                    ],
                },
            },
            metadata: {
                cardNumber: '157',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.or().br;
                    b.action('Remove 3 microbes to increase your TR 1 step.', (eb) => {
                        eb.microbes(3).startAction.tr(1);
                    }).br;
                    b.microbes(3);
                }),
                description: 'Add 3 microbes to this card.',
            },
        });
    }
}
exports.NitriteReducingBacteria = NitriteReducingBacteria;
