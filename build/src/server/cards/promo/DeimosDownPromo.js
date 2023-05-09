"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeimosDownPromo = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class DeimosDownPromo extends Card_1.Card {
    constructor(name = CardName_1.CardName.DEIMOS_DOWN_PROMO, adjacencyBonus = undefined, metadata = {
        cardNumber: 'X31',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.temperature(3).br;
            b.tile(TileType_1.TileType.DEIMOS_DOWN, true).asterix().br;
            b.steel(4, { digit: Options_1.digit }).nbsp.minus().plants(-6, { all: Options_1.all });
        }),
        description: 'Raise temperature 3 steps and gain 4 steel. Place this tile ADJACENT TO no other city tile. Remove up to 6 plants from any player.',
    }) {
        super({
            type: CardType_1.CardType.EVENT,
            name,
            tags: [Tag_1.Tag.SPACE],
            cost: 31,
            metadata,
            behavior: {
                stock: { steel: 4 },
                global: { temperature: 3 },
                removeAnyPlants: 6,
                tile: {
                    type: TileType_1.TileType.DEIMOS_DOWN,
                    on: 'city',
                    adjacencyBonus: adjacencyBonus,
                },
            },
        });
    }
}
exports.DeimosDownPromo = DeimosDownPromo;
