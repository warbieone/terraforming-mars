"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloaterTechnology = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const ActionCard_1 = require("../ActionCard");
const CardRenderer_1 = require("../render/CardRenderer");
class FloaterTechnology extends ActionCard_1.ActionCard {
    constructor() {
        super({
            cost: 7,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.FLOATER_TECHNOLOGY,
            type: CardType_1.CardType.ACTIVE,
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.FLOATER, count: 1 },
            },
            metadata: {
                cardNumber: 'C12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 floater to ANOTHER card.', (eb) => {
                        eb.empty().startAction.floaters(1).asterix();
                    });
                }),
            },
        });
    }
}
exports.FloaterTechnology = FloaterTechnology;
