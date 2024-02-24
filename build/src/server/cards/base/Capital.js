"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capital = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const Board_1 = require("../../boards/Board");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRenderDynamicVictoryPoints_1 = require("../render/CardRenderDynamicVictoryPoints");
class Capital extends Card_1.Card {
    constructor(name = CardName_1.CardName.CAPITAL, adjacencyBonus = undefined, metadata = {
        cardNumber: '008',
        description: {
            text: 'Requires 4 ocean tiles. Place this tile. Decrease your energy production 2 steps and increase your M€ production 5 steps.',
            align: 'left',
        },
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => {
                pb.minus().energy(2).br;
                pb.plus().megacredits(5);
            }).nbsp.tile(TileType_1.TileType.CAPITAL, false).br;
            b.vpText('1 additional VP for each ocean tile adjacent to this city tile.');
        }),
        victoryPoints: CardRenderDynamicVictoryPoints_1.CardRenderDynamicVictoryPoints.oceans(1, 1),
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 26,
            behavior: {
                production: { energy: -2, megacredits: 5 },
                tile: {
                    type: TileType_1.TileType.CAPITAL,
                    on: 'city',
                    title: 'Select space for special city tile',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            requirements: { oceans: 4 },
            victoryPoints: 'special',
            metadata,
        });
    }
    getVictoryPoints(player) {
        const usedSpace = player.game.board.getSpaceByTileCard(this.name);
        if (usedSpace !== undefined) {
            return player.game.board.getAdjacentSpaces(usedSpace)
                .filter((s) => Board_1.Board.isOceanSpace(s)).length;
        }
        return 0;
    }
}
exports.Capital = Capital;
