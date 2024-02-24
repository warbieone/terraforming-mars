"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NuclearZone = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class NuclearZone extends Card_1.Card {
    constructor(name = CardName_1.CardName.NUCLEAR_ZONE, cost = 10, adjacencyBonus = undefined, metadata = {
        cardNumber: '097',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.tile(TileType_1.TileType.NUCLEAR_ZONE, true).br;
            b.temperature(2);
        }),
        description: 'Place this tile and raise temperature 2 steps.',
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.EARTH],
            cost,
            behavior: {
                global: { temperature: 2 },
                tile: {
                    type: TileType_1.TileType.NUCLEAR_ZONE,
                    on: 'land',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            metadata,
            victoryPoints: -2,
            tr: { temperature: 2 },
        });
    }
}
exports.NuclearZone = NuclearZone;
