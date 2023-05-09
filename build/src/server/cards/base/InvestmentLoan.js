"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentLoan = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class InvestmentLoan extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.INVESTMENT_LOAN,
            tags: [Tag_1.Tag.EARTH],
            cost: 3,
            behavior: {
                production: { megacredits: -1 },
                stock: { megacredits: 10 },
            },
            metadata: {
                cardNumber: '151',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(-1)).nbsp.megacredits(10);
                }),
                description: 'Decrease your M€ production 1 step. Gain 10 M€.',
            },
        });
    }
}
exports.InvestmentLoan = InvestmentLoan;
