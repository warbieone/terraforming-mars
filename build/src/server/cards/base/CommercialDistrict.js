"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialDistrict = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class CommercialDistrict extends Card_1.Card {
    constructor(name = CardName_1.CardName.COMMERCIAL_DISTRICT, adjacencyBonus = undefined, metadata = {
        cardNumber: '085',
        description: 'Place this tile. Decrease your energy production 1 step and increase your M€ production 4 steps.',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => {
                pb.minus().energy(1).br;
                pb.plus().megacredits(4).br;
            }).nbsp.nbsp.tile(TileType_1.TileType.COMMERCIAL_DISTRICT, true).br;
            b.vpText('1 VP per adjacent city tile.');
        }),
        victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.cities(1, 1, true),
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.BUILDING],
            cost: 16,
            adjacencyBonus,
            behavior: {
                production: { energy: -1, megacredits: 4 },
                tile: {
                    type: TileType_1.TileType.COMMERCIAL_DISTRICT,
                    on: 'land',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            victoryPoints: 'special',
            metadata,
        });
    }
    getVictoryPoints(player) {
        const usedSpace = player.game.board.getSpaceByTileCard(this.name);
        if (usedSpace !== undefined) {
            return player.game.board.getAdjacentSpaces(usedSpace).filter((adjacentSpace) => Board_1.Board.isCitySpace(adjacentSpace)).length;
        }
        return 0;
    }
}
exports.CommercialDistrict = CommercialDistrict;
