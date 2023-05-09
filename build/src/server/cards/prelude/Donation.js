"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Donation extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.DONATION,
            behavior: {
                stock: { megacredits: 21 },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(21);
                }),
                description: 'Gain 21 M€.',
            },
        });
    }
}
exports.Donation = Donation;
