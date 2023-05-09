"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalRichAsteroid = void 0;
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class MetalRichAsteroid extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.METAL_RICH_ASTEROID,
            behavior: {
                stock: { titanium: 4, steel: 4 },
                global: { temperature: 1 },
            },
            metadata: {
                cardNumber: 'P19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(1).titanium(4).br;
                    b.steel(4);
                }),
                description: 'Increase temperature 1 step. Gain 4 titanium and 4 steel.',
            },
        });
    }
}
exports.MetalRichAsteroid = MetalRichAsteroid;
