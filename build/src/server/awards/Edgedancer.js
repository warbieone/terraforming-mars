"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edgedancer = void 0;
const TileType_1 = require("../../common/TileType");
class Edgedancer {
    constructor() {
        this.name = 'Edgedancer';
        this.description = 'Own the most tiles on the edges of the board';
    }
    getScore(player) {
        return player.game.board.spaces
            .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            this.isOnEdge(space.x, space.y)).length;
    }
    isOnEdge(x, y) {
        if (y === 0)
            return true;
        if (y === 8)
            return true;
        if (x === 8)
            return true;
        if (x === (Math.abs(4 - y)))
            return true;
        return false;
    }
}
exports.Edgedancer = Edgedancer;
//# sourceMappingURL=Edgedancer.js.map