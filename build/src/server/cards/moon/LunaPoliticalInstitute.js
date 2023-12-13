"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaPoliticalInstitute = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class LunaPoliticalInstitute extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_POLITICAL_INSTITUTE,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.EARTH],
            cost: 6,
            requirements: { tag: Tag_1.Tag.MOON, count: 2 },
            action: {
                turmoil: {
                    sendDelegates: { count: 1 },
                },
            },
            metadata: {
                description: 'Requires that you have 2 Moon tags.',
                cardNumber: 'M71',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Place one of your delegates in any party.', (eb) => eb.empty().startAction.delegates(1));
                }),
            },
        });
    }
}
exports.LunaPoliticalInstitute = LunaPoliticalInstitute;
//# sourceMappingURL=LunaPoliticalInstitute.js.map