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
        var _a;
        const game = this.player.game;
        const on = this.options.on;
        const availableSpaces = game.board.getAvailableSpacesForType(this.player, on);
        const title = (_a = this.options) === null || _a === void 0 ? void 0 : _a.title;
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            const tile = Object.assign({}, this.options.tile);
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
//# sourceMappingURL=PlaceTile.js.map