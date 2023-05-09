"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AristarchusRoadNetwork = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class AristarchusRoadNetwork extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ARISTARCHUS_ROAD_NETWORK,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 15,
            reserveUnits: { steel: 2 },
            behavior: {
                production: { megacredits: 2 },
                moon: {
                    roadTile: {},
                },
            },
            metadata: {
                description: 'Spend 2 steel. Increase your M€ production 2 steps. ' +
                    'Place a road tile on The Moon and raise the Logistics Rate 1 step.',
                cardNumber: 'M10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().steel(2).nbsp.production((eb) => eb.megacredits(2)).br;
                    b.moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_ROAD],
        });
    }
}
exports.AristarchusRoadNetwork = AristarchusRoadNetwork;
