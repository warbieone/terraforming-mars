"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOceanTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
class PlaceOceanTile extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, DeferredAction_1.Priority.PLACE_OCEAN_TILE);
        this.options = options;
    }
    execute() {
        var _a, _b, _c;
        if (!this.player.game.canAddOcean()) {
            return undefined;
        }
        const on = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.on) || 'ocean';
        const availableSpaces = this.player.game.board.getAvailableSpacesForType(this.player, on);
        const title = (_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : this.getTitle(on);
        return new SelectSpace_1.SelectSpace(title, availableSpaces, (space) => {
            this.player.game.addOceanTile(this.player, space);
            return undefined;
        });
    }
    getTitle(type) {
        switch (type) {
            case 'ocean': return 'Select space for ocean tile';
            case 'land': return 'Select a land space to place an ocean tile';
            default: throw new Error('unhandled type; ' + type);
        }
    }
}
exports.PlaceOceanTile = PlaceOceanTile;
