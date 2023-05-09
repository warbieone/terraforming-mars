"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceMoonRoadTile = void 0;
const BasePlaceMoonTile_1 = require("./BasePlaceMoonTile");
const MoonExpansion_1 = require("./MoonExpansion");
class PlaceMoonRoadTile extends BasePlaceMoonTile_1.BasePlaceMoonTile {
    constructor(player, spaces, title = 'Select a space on The Moon for a road tile.') {
        super(player, spaces, title);
    }
    getSpaces(moonData) {
        return moonData.moon.getAvailableSpacesOnLand(this.player);
    }
    placeTile(space) {
        MoonExpansion_1.MoonExpansion.addRoadTile(this.player, space.id);
        MoonExpansion_1.MoonExpansion.raiseLogisticRate(this.player);
        return undefined;
    }
}
exports.PlaceMoonRoadTile = PlaceMoonRoadTile;
