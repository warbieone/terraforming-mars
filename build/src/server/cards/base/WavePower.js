"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WavePower = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class WavePower extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.WAVE_POWER,
            tags: [Tag_1.Tag.POWER],
            cost: 8,
            victoryPoints: 1,
            behavior: {
                production: { energy: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(3)),
            metadata: {
                cardNumber: '139',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1));
                }),
                description: 'Requires 3 ocean tiles. Increase your energy production 1 step.',
            },
        });
    }
}
exports.WavePower = WavePower;
