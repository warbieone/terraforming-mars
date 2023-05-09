"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarDustProcessingPlant = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
class LunarDustProcessingPlant extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_DUST_PROCESSING_PLANT,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 6,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { logisticsRate: 1 },
            },
            metadata: {
                description: 'Spend 1 titanium. Raise the logistic rate 1 step.',
                cardNumber: 'M17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you place a road tile on The Moon, you spend no steel on it.', (eb) => {
                        eb.startEffect.tile(TileType_1.TileType.MOON_ROAD, false).colon().text('0').steel(1);
                    }).br;
                    b.minus().titanium(1).moonLogisticsRate();
                }),
            },
        });
    }
}
exports.LunarDustProcessingPlant = LunarDustProcessingPlant;
