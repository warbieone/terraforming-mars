"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkyDocks = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
class SkyDocks extends Card_1.Card {
    constructor() {
        super({
            cost: 18,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            name: CardName_1.CardName.SKY_DOCKS,
            type: CardType_1.CardType.ACTIVE,
            victoryPoints: 1,
            behavior: {
                colonies: { addTradeFleet: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.EARTH, 2)),
            cardDiscount: { amount: 1 },
            metadata: {
                cardNumber: 'C36',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a card, you pay 1 M€ less for it.', (eb) => {
                        eb.empty().startEffect.megacredits(-1);
                    }).br;
                    b.tradeFleet();
                }),
                description: 'Requires 2 Earth tags. Gain 1 Trade Fleet.',
            },
        });
    }
}
exports.SkyDocks = SkyDocks;
//# sourceMappingURL=SkyDocks.js.map