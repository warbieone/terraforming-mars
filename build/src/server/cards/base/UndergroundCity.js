"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndergroundCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class UndergroundCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.UNDERGROUND_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 18,
            behavior: {
                production: { energy: -2, steel: 2 },
                city: {},
            },
            metadata: {
                cardNumber: '032',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(2).br;
                        pb.plus().steel(2);
                    }).nbsp.city();
                }),
                description: 'Place a city tile. Decrease your energy production 2 steps and increase your steel production 2 steps.',
            },
        });
    }
}
exports.UndergroundCity = UndergroundCity;
