"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianCulture = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const Options_1 = require("../Options");
class MartianCulture extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MARTIAN_CULTURE,
            cost: 11,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.MARS],
            resourceType: CardResource_1.CardResource.DATA,
            requirements: { tag: Tag_1.Tag.MARS, count: 2, all: Options_1.all },
            victoryPoints: { resourcesHere: {}, per: 2 },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 1 },
            },
            metadata: {
                cardNumber: 'Pf35',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 data to ANY card.', (eb) => eb.empty().startAction.data({ amount: 1 }).asterix());
                }),
                description: 'Requires any 2 Mars tags in play.  1 VP for every 2 data here.',
            },
        });
    }
}
exports.MartianCulture = MartianCulture;
//# sourceMappingURL=MartianCulture.js.map