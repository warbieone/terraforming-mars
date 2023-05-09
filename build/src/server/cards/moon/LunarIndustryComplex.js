"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarIndustryComplex = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const TileType_1 = require("../../../common/TileType");
class LunarIndustryComplex extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_INDUSTRY_COMPLEX,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 28,
            behavior: {
                production: { steel: 1, titanium: 1, energy: 2, heat: 1 },
                moon: { mineTile: {} },
            },
            reserveUnits: { titanium: 2 },
            metadata: {
                description: 'Spend 2 titanium. Place a mine tile on The Moon and raise the mining rate 1 step. ' +
                    'Increase your steel, titanium, and heat production 1 step each. Increase your energy production 2 steps.',
                cardNumber: 'M74',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).moonMine().br;
                    b.production((pb) => pb.steel(1).titanium(1).heat(1).energy(2));
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_MINE],
        });
    }
}
exports.LunarIndustryComplex = LunarIndustryComplex;
