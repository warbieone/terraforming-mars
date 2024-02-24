"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstateDealer = void 0;
const AresTileType_1 = require("../../common/AresTileType");
const Board_1 = require("../boards/Board");
class EstateDealer {
    constructor() {
        this.name = 'Estate Dealer';
        this.description = 'Own the most tiles adjacent to ocean tiles';
    }
    getScore(player) {
        return player.game.board.spaces.filter((space) => space.player === player &&
            space.tile !== undefined &&
            (0, AresTileType_1.isHazardTileType)(space.tile.tileType) === false &&
            player.game.board.getAdjacentSpaces(space).some((space) => Board_1.Board.isOceanSpace(space))).length;
    }
}
exports.EstateDealer = EstateDealer;
