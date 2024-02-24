"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentCenter = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class DevelopmentCenter extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.DEVELOPMENT_CENTER,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 11,
            action: {
                spend: { energy: 1 },
                drawCard: 1,
            },
            metadata: {
                cardNumber: '014',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 energy to draw a card.', (eb) => {
                        eb.energy(1).startAction.cards(1);
                    });
                }),
            },
        });
    }
}
exports.DevelopmentCenter = DevelopmentCenter;
