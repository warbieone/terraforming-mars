"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicInfrastructure = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
class BasicInfrastructure extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.BASIC_INFRASTRUCTURE,
            tags: [Tag_1.Tag.MOON],
            behavior: {
                moon: { roadTile: {} },
                colonies: { addTradeFleet: 1 },
            },
            metadata: {
                description: 'Place a road tile on The Moon and raise the Logistics Rate 1 step. Gain 1 trade fleet.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tile(TileType_1.TileType.MOON_ROAD, false).tradeFleet();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_ROAD],
        });
    }
}
exports.BasicInfrastructure = BasicInfrastructure;
