"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraPioneer = void 0;
const TileType_1 = require("../../../common/TileType");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const IMilestone_1 = require("../IMilestone");
class TerraPioneer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Terra Pioneer', 'Own 5 tiles on Mars', 5);
    }
    getScore(player) {
        const marsSpaces = player.game.board.spaces.filter((space) => {
            return space.tile !== undefined &&
                (0, TileType_1.isHazardTileType)(space.tile.tileType) === false &&
                space.tile.tileType !== TileType_1.TileType.OCEAN &&
                space.spaceType !== SpaceType_1.SpaceType.COLONY &&
                space.player === player;
        }).length;
        return marsSpaces;
    }
}
exports.TerraPioneer = TerraPioneer;
