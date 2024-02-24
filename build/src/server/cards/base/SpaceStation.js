"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceStation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class SpaceStation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SPACE_STATION,
            tags: [Tag_1.Tag.SPACE],
            cost: 10,
            victoryPoints: 1,
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 2 },
            metadata: {
                cardNumber: '025',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 2 M€ less for it.', (eb) => {
                        eb.space({ played: Options_1.played }).startEffect.megacredits(-2);
                    });
                }),
            },
        });
    }
}
exports.SpaceStation = SpaceStation;
