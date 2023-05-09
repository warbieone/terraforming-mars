"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianDustProcessingPlant = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class MartianDustProcessingPlant extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MARTIAN_DUST_PROCESSING_PLANT,
            cost: 15,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.BUILDING],
            victoryPoints: 1,
            behavior: {
                production: { energy: -1, steel: 2 },
                tr: 1,
            },
            metadata: {
                cardNumber: 'Pf44',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().energy(1).nbsp.steel(2)).br;
                    b.tr(1);
                }),
                description: 'Decrease your energy production 1 step, and raise your steel production 2 steps. Gain 1 TR.',
            },
        });
    }
}
exports.MartianDustProcessingPlant = MartianDustProcessingPlant;
