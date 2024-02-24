"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoholeArea = void 0;
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MoholeArea extends Card_1.Card {
    constructor(name = CardName_1.CardName.MOHOLE_AREA, adjacencyBonus = undefined, metadata = {
        cardNumber: '142',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => pb.heat(4, { digit: Options_1.digit })).br;
            b.tile(TileType_1.TileType.MOHOLE_AREA, true);
        }),
        description: 'Increase your heat production 4 steps. Place this tile ON AN AREA RESERVED FOR OCEAN.',
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.BUILDING],
            cost: 20,
            metadata,
            behavior: {
                production: { heat: 4 },
                tile: {
                    type: TileType_1.TileType.MOHOLE_AREA,
                    on: 'ocean',
                    adjacencyBonus: adjacencyBonus,
                },
            },
        });
    }
}
exports.MoholeArea = MoholeArea;
