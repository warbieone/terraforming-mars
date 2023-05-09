"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegolithEaters = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class RegolithEaters extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.REGOLITH_EATERS,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.MICROBE],
            cost: 13,
            resourceType: CardResource_1.CardResource.MICROBE,
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [{
                            title: 'Remove 2 microbes to raise oxygen level 1 step',
                            spend: { resourcesHere: 2 },
                            global: { oxygen: 1 },
                        },
                        {
                            title: 'Add 1 microbe to this card',
                            addResources: 1,
                        }],
                },
            },
            metadata: {
                cardNumber: '033',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.or().br;
                    b.action('Remove 2 microbes from this card to raise oxygen level 1 step.', (eb) => {
                        eb.microbes(2).startAction.oxygen(1);
                    }).br;
                }),
            },
        });
    }
}
exports.RegolithEaters = RegolithEaters;
