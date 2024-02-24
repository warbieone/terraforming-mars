"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventionContest = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class InventionContest extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.INVENTION_CONTEST,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 2,
            behavior: {
                drawCard: { count: 3, keep: 1 },
            },
            metadata: {
                cardNumber: '192',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Look at the top 3 cards from the deck. Take 1 of them into hand and discard the other two', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
}
exports.InventionContest = InventionContest;
