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
                stock: { megacredits: 23 },
            },
            metadata: {
                cardNumber: 'P08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(23);
                }),
                description: 'Gain 23 M€.',
            },
        });
    }
}
exports.Donation = Donation;
//# sourceMappingURL=Donation.js.map