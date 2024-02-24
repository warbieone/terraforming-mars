"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Landlord = void 0;
const TileType_1 = require("../../common/TileType");
const AresTileType_1 = require("../../common/AresTileType");
const MoonExpansion_1 = require("../moon/MoonExpansion");
class Landlord {
    constructor() {
        this.name = 'Landlord';
        this.description = 'Own the most tiles';
    }
    getScore(player) {
        const marsSpaces = player.game.board.spaces.filter((space) => space.tile !== undefined && (0, AresTileType_1.isHazardTileType)(space.tile.tileType) === false && space.tile.tileType !== TileType_1.TileType.OCEAN && space.player === player).length;
        const moonSpaces = MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => moonData.moon.spaces.filter((space) => space.tile !== undefined && space.player === player).length, () => 0);
        return marsSpaces + moonSpaces;
    }
}
exports.Landlord = Landlord;
