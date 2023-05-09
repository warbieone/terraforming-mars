"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceMoonHabitatTile = void 0;
const BasePlaceMoonTile_1 = require("./BasePlaceMoonTile");
const MoonExpansion_1 = require("./MoonExpansion");
class PlaceMoonHabitatTile extends BasePlaceMoonTile_1.BasePlaceMoonTile {
    constructor(player, spaces, title = 'Select a space on The Moon for a habitat tile.') {
        super(player, spaces, title);
    }
    getSpaces(moonData) {
        return moonData.moon.getAvailableSpacesOnLand(this.player);
    }
    placeTile(space) {
        MoonExpansion_1.MoonExpansion.addHabitatTile(this.player, space.id);
        MoonExpansion_1.MoonExpansion.raiseHabitatRate(this.player);
        return undefined;
    }
}
exports.PlaceMoonHabitatTile = PlaceMoonHabitatTile;
