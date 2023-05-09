"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OceanCity = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class OceanCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.OCEAN_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 18,
            behavior: {
                production: { energy: -1, megacredits: 3 },
                tile: {
                    type: TileType_1.TileType.OCEAN_CITY,
                    on: 'upgradeable-ocean',
                    title: 'Select space for Ocean City',
                },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(6)),
            metadata: {
                cardNumber: 'A20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(3);
                    }).nbsp.tile(TileType_1.TileType.OCEAN_CITY, false, true);
                }),
                description: 'Requires 6 ocean tiles. Decrease your energy production 1 step and increase your M€ production 3 steps. Place this tile on top of an existing ocean tile, IGNORING NORMAL PLACEMENT RESTRICTIONS FOR CITIES. The tile counts as a city as well as an ocean.',
            },
        });
    }
}
exports.OceanCity = OceanCity;
