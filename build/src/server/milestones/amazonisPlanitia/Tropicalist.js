"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tropicalist = void 0;
const TileType_1 = require("../../../common/TileType");
const IMilestone_1 = require("../IMilestone");
class Tropicalist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Tropicalist', 'Own 3 tiles in the middle 3 equatorial rows', 3);
    }
    getScore(player) {
        return player.game.board.spaces
            .filter((space) => space.player !== undefined &&
            space.player === player &&
            space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            space.y >= 3 && space.y <= 5).length;
    }
}
exports.Tropicalist = Tropicalist;
