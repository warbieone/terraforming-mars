"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CupolaCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class CupolaCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CUPOLA_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 16,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                city: {},
            },
            requirements: { oxygen: 9, max: Options_1.max },
            metadata: {
                cardNumber: '029',
                description: 'Oxygen must be 9% or less. Place a city tile. Decrease your energy production 1 step and increase your M€ production 3 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).nbsp.nbsp.city();
                }),
            },
        });
    }
}
exports.CupolaCity = CupolaCity;
