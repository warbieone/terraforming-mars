"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningArea = void 0;
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const MiningCard_1 = require("./MiningCard");
const CardRenderer_1 = require("../render/CardRenderer");
class MiningArea extends MiningCard_1.MiningCard {
    constructor(name = CardName_1.CardName.MINING_AREA, metadata = {
        cardNumber: '064',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.tile(TileType_1.TileType.MINING_AREA, true).asterix().br;
            b.production((pb) => {
                pb.steel(1).or().titanium(1);
            }).asterix();
        }),
        description: 'Place this tile on an area with a steel or titanium placement bonus, adjacent to another of your tiles. Increase your production of that resource 1 step.',
    }) {
        super(name, 4, metadata);
    }
    getAvailableSpaces(player) {
        return super.getAvailableSpaces(player)
            .filter((space) => player.game.board.getAdjacentSpaces(space).some((adjacentSpace) => adjacentSpace.tile !== undefined && adjacentSpace.tile.tileType !== TileType_1.TileType.OCEAN && adjacentSpace.player === player));
    }
}
exports.MiningArea = MiningArea;
