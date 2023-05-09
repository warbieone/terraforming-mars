"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loan = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Loan extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.LOAN,
            behavior: {
                production: { megacredits: -2 },
                stock: { megacredits: 30 },
            },
            metadata: {
                cardNumber: 'P17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().megacredits(2)).br;
                    b.megacredits(30);
                }),
                description: 'Gain 30 M€. Decrease your M€ production 2 steps.',
            },
        });
    }
}
exports.Loan = Loan;
