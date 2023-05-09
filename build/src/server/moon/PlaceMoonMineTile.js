"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceMoonMineTile = void 0;
const BasePlaceMoonTile_1 = require("./BasePlaceMoonTile");
const MoonExpansion_1 = require("./MoonExpansion");
class PlaceMoonMineTile extends BasePlaceMoonTile_1.BasePlaceMoonTile {
    constructor(player, spaces, title = 'Select a space on The Moon for a mining tile.') {
        super(player, spaces, title);
        this.cb = () => { };
    }
    andThen(cb) {
        this.cb = cb;
        return this;
    }
    getSpaces(moonData) {
        return moonData.moon.getAvailableSpacesForMine(this.player);
    }
    placeTile(space) {
        MoonExpansion_1.MoonExpansion.addMineTile(this.player, space.id);
        MoonExpansion_1.MoonExpansion.raiseMiningRate(this.player);
        this.cb(space);
        return undefined;
    }
}
exports.PlaceMoonMineTile = PlaceMoonMineTile;
