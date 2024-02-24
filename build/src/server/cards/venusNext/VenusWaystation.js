"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusWaystation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class VenusWaystation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VENUS_WAYSTATION,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.SPACE],
            cost: 9,
            victoryPoints: 1,
            cardDiscount: { tag: Tag_1.Tag.VENUS, amount: 2 },
            metadata: {
                cardNumber: '258',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a Venus tag, you pay 2 M€ less for it.', (eb) => {
                        eb.venus(1, { played: Options_1.played }).startEffect.megacredits(-2);
                    });
                }),
            },
        });
    }
}
exports.VenusWaystation = VenusWaystation;
