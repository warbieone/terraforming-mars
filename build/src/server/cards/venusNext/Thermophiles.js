"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thermophiles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class Thermophiles extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.THERMOPHILES,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.MICROBE],
            cost: 9,
            resourceType: CardResource_1.CardResource.MICROBE,
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [{
                            title: 'Spend 2 microbes here to raise Venus 1 step.',
                            spend: { resourcesHere: 2 },
                            global: { venus: 1 },
                        },
                        {
                            title: 'Select a Venus card to add 1 microbe',
                            addResourcesToAnyCard: {
                                count: 1,
                                tag: Tag_1.Tag.VENUS,
                                type: CardResource_1.CardResource.MICROBE,
                                autoSelect: true,
                            },
                        }],
                },
            },
            requirements: { venus: 6 },
            metadata: {
                cardNumber: '253',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to ANY Venus CARD.', (eb) => {
                        eb.empty().startAction.microbes(1, { secondaryTag: Tag_1.Tag.VENUS });
                    }).br;
                    b.or().br;
                    b.action('Remove 2 microbes to raise Venus 1 step', (eb) => {
                        eb.microbes(2).startAction.venus(1);
                    });
                }),
                description: 'Requires Venus 6%',
            },
        });
    }
}
exports.Thermophiles = Thermophiles;
//# sourceMappingURL=Thermophiles.js.map