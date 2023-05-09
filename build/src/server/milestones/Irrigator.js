"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Irrigator = void 0;
const IMilestone_1 = require("./IMilestone");
const Board_1 = require("../boards/Board");
const TileType_1 = require("../../common/TileType");
class Irrigator extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Irrigator', 'Own 4 tiles adjacent to oceans', 4);
    }
    getScore(player) {
        return player.game.board.spaces.filter((space) => space.player === player &&
            space.tile !== undefined &&
            (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
            player.game.board.getAdjacentSpaces(space).some((space) => Board_1.Board.isOceanSpace(space))).length;
    }
}
exports.Irrigator = Irrigator;
