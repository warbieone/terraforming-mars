"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
class PlaceTile extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, Priority_1.Priority.DEFAULT);
        this.options = options;
    }
    execute() {
        const game = this.player.game;
        const on = this.options.on;
        const availableSpaces = game.board.getAvailableSpacesForType(this.player, on);
        const title = this.options?.title;
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            const tile = { ...this.options.tile };
            if (this.options.on === 'upgradeable-ocean') {
                tile.covers = space.tile;
            }
            game.addTile(this.player, space, tile);
            space.adjacency = this.options.adjacencyBonus;
            return undefined;
        });
    }
}
exports.PlaceTile = PlaceTile;
