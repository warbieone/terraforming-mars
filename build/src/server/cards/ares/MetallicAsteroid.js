"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetallicAsteroid = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MetallicAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.METALLIC_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 13,
            behavior: {
                stock: { titanium: 1 },
                global: { temperature: 1 },
                removeAnyPlants: 4,
                tile: {
                    type: TileType_1.TileType.METALLIC_ASTEROID,
                    on: 'land',
                    title: 'Select space for Metallic Asteroid tile',
                    adjacencyBonus: { bonus: [SpaceBonus_1.SpaceBonus.TITANIUM] },
                },
            },
            metadata: {
                cardNumber: 'A13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(1).titanium(1).br;
                    b.minus().plants(4, { digit: Options_1.digit, all: Options_1.all });
                    b.tile(TileType_1.TileType.METALLIC_ASTEROID, false, true);
                }),
                description: 'Raise temperature 1 step and gain 1 titanium. Remove up to 4 plants from any player. Place this tile which grants an ADJACENCY BONUS of 1 titanium.',
            },
        });
    }
}
exports.MetallicAsteroid = MetallicAsteroid;
