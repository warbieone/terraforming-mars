"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuttingEdgeTechnology = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class CuttingEdgeTechnology extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.CUTTING_EDGE_TECHNOLOGY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'X18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When playing a card with a requirement, you pay 2 M€ less for it.', (eb) => {
                        eb.cards(1, { secondaryTag: AltSecondaryTag_1.AltSecondaryTag.REQ }).startEffect.megacredits(-2);
                    });
                }),
            },
        });
    }
    getCardDiscount(_player, card) {
        if (card.requirements !== undefined)
            return 2;
        return 0;
    }
}
exports.CuttingEdgeTechnology = CuttingEdgeTechnology;
