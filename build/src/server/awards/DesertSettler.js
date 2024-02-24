"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesertSettler = void 0;
const AresTileType_1 = require("../../common/AresTileType");
const Board_1 = require("../boards/Board");
class DesertSettler {
    constructor() {
        this.name = 'Desert Settler';
        this.description = 'Own the most tiles south of the equator (the four bottom rows)';
    }
    getScore(player) {
        return player.game.board.spaces
            .filter(Board_1.Board.ownedBy(player))
            .filter((space) => space.tile !== undefined &&
            (0, AresTileType_1.isHazardTileType)(space.tile.tileType) === false &&
            space.y >= 5 && space.y <= 8).length;
    }
}
exports.DesertSettler = DesertSettler;
