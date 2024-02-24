"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessContacts = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class BusinessContacts extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.BUSINESS_CONTACTS,
            tags: [Tag_1.Tag.EARTH],
            cost: 7,
            behavior: {
                drawCard: { count: 4, keep: 2 },
            },
            metadata: {
                cardNumber: '111',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.text('Look at the top 4 cards from the deck. Take 2 of them into hand and discard the other 2.', Size_1.Size.SMALL, true)),
            },
        });
    }
}
exports.BusinessContacts = BusinessContacts;
