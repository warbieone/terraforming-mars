"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastResortIngenuity = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class LastResortIngenuity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.LAST_RESORT_INGENUITY,
            cost: 4,
            metadata: {
                cardNumber: 'Pf47',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(1).asterix().colon().openBrackets.steel(1).titanium(1).closeBrackets;
                    b.br;
                    b.text('The next card you play this generation can be paid for with steel or titanium despite its tags.', Size_1.Size.MEDIUM, true, true);
                }),
            },
        });
    }
}
exports.LastResortIngenuity = LastResortIngenuity;
