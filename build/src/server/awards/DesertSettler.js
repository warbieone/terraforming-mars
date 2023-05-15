"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesertSettler = void 0;
const TileType_1 = require("../../common/TileType");
const Board_1 = require("../boards/Board");
class DesertSettler {
    constructor() {
        this.name = 'Desert Settler';
        this.description = 'Most tiles south of the equator (the four bottom rows)';
    }
    getScore(player) {
        return player.game.board.spaces
            .filter(Board_1.Board.ownedBy(player))
            .filter((space) => space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            space.y >= 5 && space.y <= 8).length;
    }
}
exports.DesertSettler = DesertSettler;
//# sourceMappingURL=DesertSettler.js.map