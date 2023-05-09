"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EarthOffice = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class EarthOffice extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.EARTH_OFFICE,
            tags: [Tag_1.Tag.EARTH],
            cost: 1,
            cardDiscount: { tag: Tag_1.Tag.EARTH, amount: 3 },
            metadata: {
                cardNumber: '105',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play an Earth tag, you pay 3 M€ less for it.', (eb) => {
                        eb.earth(1, { played: Options_1.played }).startEffect.megacredits(-3);
                    });
                }),
            },
        });
    }
}
exports.EarthOffice = EarthOffice;
