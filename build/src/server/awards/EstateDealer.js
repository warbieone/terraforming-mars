"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstateDealer = void 0;
const TileType_1 = require("../../common/TileType");
const Board_1 = require("../boards/Board");
class EstateDealer {
    constructor() {
        this.name = 'Estate Dealer';
        this.description = 'Most tiles adjacent to ocean tiles';
    }
    getScore(player) {
        return player.game.board.spaces.filter((space) => space.player === player &&
            space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            player.game.board.getAdjacentSpaces(space).some((space) => Board_1.Board.isOceanSpace(space))).length;
    }
}
exports.EstateDealer = EstateDealer;
//# sourceMappingURL=EstateDealer.js.map