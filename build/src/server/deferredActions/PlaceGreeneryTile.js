"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceGreeneryTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
class PlaceGreeneryTile extends DeferredAction_1.DeferredAction {
    constructor(player, on = 'greenery') {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.on = on;
    }
    execute() {
        const availableSpaces = this.player.game.board.getAvailableSpacesForType(this.player, this.on);
        if (availableSpaces.length === 0) {
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(this.getTitle(), availableSpaces, (space) => {
            this.player.game.addGreenery(this.player, space);
            return undefined;
        });
    }
    getTitle() {
        switch (this.on) {
            case 'greenery': return 'Select space for greenery tile';
            case 'ocean': return 'Select space reserved for ocean to place greenery tile';
            default: throw new Error('unhandled type; ' + this.on);
        }
    }
}
exports.PlaceGreeneryTile = PlaceGreeneryTile;
