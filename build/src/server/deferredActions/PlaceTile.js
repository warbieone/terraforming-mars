"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
class PlaceTile extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.options = options;
    }
    execute() {
        var _a, _b;
        const game = this.player.game;
        const on = this.options.on;
        const availableSpaces = game.board.getAvailableSpacesForType(this.player, on);
        const title = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : this.getTitle(on);
        return new SelectSpace_1.SelectSpace(title, availableSpaces, (space) => {
            const tile = Object.assign({}, this.options.tile);
            if (this.options.on === 'upgradeable-ocean') {
                tile.covers = space.tile;
            }
            game.addTile(this.player, space, tile);
            space.adjacency = this.options.adjacencyBonus;
            return undefined;
        });
    }
    getTitle(type) {
        switch (type) {
            case 'ocean': return 'Select an ocean space for special tile';
            case 'isolated': return 'Select space for special tile next to no other tile';
            default: return 'Select space for special tile';
        }
    }
}
exports.PlaceTile = PlaceTile;
