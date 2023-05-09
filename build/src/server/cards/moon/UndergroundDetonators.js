"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndergroundDetonators = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class UndergroundDetonators extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.UNDERGROUND_DETONATORS,
            type: CardType_1.CardType.EVENT,
            cost: 9,
            behavior: {
                stock: { steel: 1, titanium: 1 },
                moon: { miningRate: 1 },
            },
            metadata: {
                description: 'Gain 1 steel and 1 titanium. Raise the mining rate 1 step.',
                cardNumber: 'M34',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.steel(1).titanium(1);
                    b.br;
                    b.moonMiningRate();
                }),
            },
        });
    }
}
exports.UndergroundDetonators = UndergroundDetonators;
