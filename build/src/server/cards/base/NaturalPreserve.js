"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalPreserve = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class NaturalPreserve extends Card_1.Card {
    constructor(name = CardName_1.CardName.NATURAL_PRESERVE, adjacencyBonus = undefined, metadata = {
        cardNumber: '044',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => pb.megacredits(1)).nbsp.tile(TileType_1.TileType.NATURAL_PRESERVE, true).asterix();
        }),
        description: 'Oxygen must be 4% or less. Place this tile NEXT TO NO OTHER TILE. Increase your M€ production 1 step.',
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 9,
            behavior: {
                production: { megacredits: 1 },
                tile: {
                    type: TileType_1.TileType.NATURAL_PRESERVE,
                    on: 'isolated',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            adjacencyBonus,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(4, { max: Options_1.max })),
            victoryPoints: 1,
            metadata,
        });
    }
}
exports.NaturalPreserve = NaturalPreserve;
//# sourceMappingURL=NaturalPreserve.js.map