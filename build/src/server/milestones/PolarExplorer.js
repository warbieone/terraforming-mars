"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarExplorer = void 0;
const IMilestone_1 = require("./IMilestone");
const TileType_1 = require("../../common/TileType");
const Board_1 = require("../boards/Board");
class PolarExplorer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Polar Explorer', 'Own 3 tiles on the two bottom rows', 3);
    }
    getScore(player) {
        return player.game.board.spaces
            .filter(Board_1.Board.ownedBy(player))
            .filter((space) => space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            space.y >= 7 && space.y <= 8).length;
    }
}
exports.PolarExplorer = PolarExplorer;
