"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiomassCombustors = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class BiomassCombustors extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BIOMASS_COMBUSTORS,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 4,
            victoryPoints: -1,
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 1 },
                production: { energy: 2 },
            },
            requirements: { oxygen: 6 },
            metadata: {
                description: 'Requires 6% oxygen. Decrease any plant production 1 step and increase your energy production 2 steps.',
                cardNumber: '183',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().plants(-1, { all: Options_1.all }).br;
                        pb.plus().energy(2);
                    });
                }),
            },
        });
    }
}
exports.BiomassCombustors = BiomassCombustors;
//# sourceMappingURL=BiomassCombustors.js.map