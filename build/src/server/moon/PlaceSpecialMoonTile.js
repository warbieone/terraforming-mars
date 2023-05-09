"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceSpecialMoonTile = void 0;
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const SelectSpace_1 = require("../inputs/SelectSpace");
const MoonExpansion_1 = require("./MoonExpansion");
class PlaceSpecialMoonTile extends DeferredAction_1.DeferredAction {
    constructor(player, tile, title = 'Select a space on The Moon for this tile.') {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.tile = tile;
        this.title = title;
    }
    execute() {
        const moonData = MoonExpansion_1.MoonExpansion.moonData(this.player.game);
        const spaces = moonData.moon.getAvailableSpacesOnLand(this.player);
        if (spaces.length === 0) {
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(this.title, spaces, (space) => {
            MoonExpansion_1.MoonExpansion.addTile(this.player, space.id, this.tile);
            return undefined;
        });
    }
}
exports.PlaceSpecialMoonTile = PlaceSpecialMoonTile;
