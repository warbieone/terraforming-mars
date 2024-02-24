"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalsCompany = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MetalsCompany extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.METALS_COMPANY,
            behavior: {
                production: { megacredits: 1, steel: 1, titanium: 1 },
            },
            metadata: {
                cardNumber: 'P20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1).steel(1).titanium(1));
                }),
                description: 'Increase your M€, steel and titanium production 1 step.',
            },
        });
    }
}
exports.MetalsCompany = MetalsCompany;
