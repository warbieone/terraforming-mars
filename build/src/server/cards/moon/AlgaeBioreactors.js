"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgaeBioreactors = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class AlgaeBioreactors extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ALGAE_BIOREACTORS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.PLANT],
            cost: 9,
            behavior: {
                production: { plants: -1 },
                global: { oxygen: 1 },
                moon: { habitatRate: 1 },
            },
            metadata: {
                description: 'Decrease your plant production 1 step. Raise the habitat rate 1 step and oxygen 1%.',
                cardNumber: 'M47',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.minus().plants(1)).moonHabitatRate().oxygen(1);
                }),
            },
        });
    }
}
exports.AlgaeBioreactors = AlgaeBioreactors;
