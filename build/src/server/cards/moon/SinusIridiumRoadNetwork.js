"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinusIridiumRoadNetwork = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class SinusIridiumRoadNetwork extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SINUS_IRIDIUM_ROAD_NETWORK,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 15,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                moon: {
                    roadTile: {},
                },
            },
            reserveUnits: { steel: 1 },
            metadata: {
                description: 'Decrease your energy production 1 step and increase your M€ production 3 steps. ' +
                    'Spend 1 steel. ' +
                    'Place a road tile on The Moon and raise the Logistics Rate 1 step.',
                cardNumber: 'M11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).nbsp.plus().megacredits(3);
                    }).br;
                    b.minus().steel(1).br;
                    b.moonRoad({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_LOGISTICS_RATE });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_ROAD],
        });
    }
}
exports.SinusIridiumRoadNetwork = SinusIridiumRoadNetwork;
