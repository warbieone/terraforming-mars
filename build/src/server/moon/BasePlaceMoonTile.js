"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePlaceMoonTile = void 0;
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const SelectSpace_1 = require("../inputs/SelectSpace");
const MoonExpansion_1 = require("./MoonExpansion");
class BasePlaceMoonTile extends DeferredAction_1.DeferredAction {
    constructor(player, spaces, title = 'Select a space for a tile') {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.spaces = spaces;
        this.title = title;
    }
    execute() {
        const spaces = this.spaces !== undefined ? this.spaces : this.getSpaces(MoonExpansion_1.MoonExpansion.moonData(this.player.game));
        if (spaces.length === 0) {
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(this.title, spaces, (space) => this.placeTile(space));
    }
}
exports.BasePlaceMoonTile = BasePlaceMoonTile;
