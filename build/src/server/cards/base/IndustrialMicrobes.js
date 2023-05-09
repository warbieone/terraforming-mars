"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustrialMicrobes = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class IndustrialMicrobes extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.INDUSTRIAL_MICROBES,
            tags: [Tag_1.Tag.MICROBE, Tag_1.Tag.BUILDING],
            cost: 12,
            behavior: {
                production: { energy: 1, steel: 1 },
            },
            metadata: {
                cardNumber: '158',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).steel(1));
                }),
                description: 'Increase your energy production and your steel production 1 step each.',
            },
        });
    }
}
exports.IndustrialMicrobes = IndustrialMicrobes;
