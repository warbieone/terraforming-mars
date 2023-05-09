"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOceanTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const LogHelper_1 = require("../LogHelper");
class RemoveOceanTile extends DeferredAction_1.DeferredAction {
    constructor(player, title = 'Select an Ocean tile to remove from board') {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.title = title;
    }
    execute() {
        const removableOceanTiles = this.player.game.board.getOceanSpaces({ upgradedOceans: false });
        if (removableOceanTiles.length === 0) {
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(this.title, removableOceanTiles, (space) => {
            this.player.game.removeTile(space.id);
            LogHelper_1.LogHelper.logBoardTileAction(this.player, space, 'ocean tile', 'removed');
            return undefined;
        });
    }
}
exports.RemoveOceanTile = RemoveOceanTile;
