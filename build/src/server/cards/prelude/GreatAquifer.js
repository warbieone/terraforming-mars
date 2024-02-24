"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatAquifer = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class GreatAquifer extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.GREAT_AQUIFER,
            behavior: {
                ocean: { count: 2 },
            },
            metadata: {
                cardNumber: 'P13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(2);
                }),
                description: 'Place 2 ocean tiles.',
            },
        });
    }
}
exports.GreatAquifer = GreatAquifer;
