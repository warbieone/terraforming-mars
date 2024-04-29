"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceCityTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
class PlaceCityTile extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, Priority_1.Priority.DEFAULT);
        this.options = options;
    }
    execute() {
        const type = this.options?.on || 'city';
        const spaces = this.options?.spaces || this.player.game.board.getAvailableSpacesForType(this.player, type);
        const title = this.options?.title ?? this.getTitle(type);
        if (spaces.length === 0) {
            this.cb(undefined);
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(title, spaces)
            .andThen((space) => {
            this.player.game.addCity(this.player, space);
            this.cb(space);
            return undefined;
        });
    }
    getTitle(type) {
        switch (type) {
            case 'city': return 'Select space for city tile';
            case 'isolated': return 'Select place next to no other tile for city';
            default: throw new Error('unhandled type; ' + type);
        }
    }
}
exports.PlaceCityTile = PlaceCityTile;
