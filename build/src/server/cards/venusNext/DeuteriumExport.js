"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeuteriumExport = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const ActionCard_1 = require("../ActionCard");
class DeuteriumExport extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.DEUTERIUM_EXPORT,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.VENUS, Tag_1.Tag.POWER],
            cost: 11,
            resourceType: CardResource_1.CardResource.FLOATER,
            action: {
                or: {
                    autoSelect: true,
                    behaviors: [{
                            title: 'Remove 1 floater to raise energy production 1 step',
                            spend: { resourcesHere: 1 },
                            production: { energy: 1 },
                        },
                        {
                            title: 'Add 1 floater to this card',
                            addResources: 1,
                        }],
                },
            },
            metadata: {
                cardNumber: '221',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to this card.', (eb) => {
                        eb.empty().startAction.floaters(1);
                    }).br;
                    b.or(Size_1.Size.SMALL).br;
                    b.action('Spend 1 floater here to increase your energy production 1 step.', (be) => {
                        be.floaters(1).startAction.production((pb) => pb.energy(1));
                    });
                }),
            },
        });
    }
}
exports.DeuteriumExport = DeuteriumExport;
