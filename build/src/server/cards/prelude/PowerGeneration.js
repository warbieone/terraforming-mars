"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerGeneration = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class PowerGeneration extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.POWER_GENERATION,
            tags: [Tag_1.Tag.POWER],
            behavior: {
                production: { energy: 3 },
            },
            metadata: {
                cardNumber: 'P27',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(3));
                }),
                description: 'Increase your energy production 3 steps.',
            },
        });
    }
}
exports.PowerGeneration = PowerGeneration;
