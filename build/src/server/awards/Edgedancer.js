"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edgedancer = void 0;
const AresTileType_1 = require("../../common/AresTileType");
class Edgedancer {
    constructor() {
        this.name = 'Edgedancer';
        this.description = 'Own the most tiles on the edges of the board';
    }
    getScore(player) {
        return player.game.board.getEdges()
            .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            (0, AresTileType_1.isHazardTileType)(space.tile.tileType) === false).length;
    }
}
exports.Edgedancer = Edgedancer;
//# sourceMappingURL=Edgedancer.js.map