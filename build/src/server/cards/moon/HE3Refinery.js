"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HE3Refinery = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class HE3Refinery extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.HE3_REFINERY,
            cost: 8,
            tags: [Tag_1.Tag.MOON],
            action: {
                stock: { megacredits: { moon: { miningRate: {} } } },
            },
            metadata: {
                cardNumber: 'M49',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Gain 1 M€ for each level of mining rate.', (eb) => {
                        eb.empty().startAction;
                        eb.megacredits(1).slash().moonMiningRate();
                    });
                }),
            },
        });
    }
}
exports.HE3Refinery = HE3Refinery;
