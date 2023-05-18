"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceCityTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
class PlaceCityTile extends DeferredAction_1.DeferredAction {
    constructor(player, options) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.options = options;
    }
    execute() {
        var _a, _b, _c, _d;
        const type = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.on) || 'city';
        const spaces = ((_b = this.options) === null || _b === void 0 ? void 0 : _b.spaces) || this.player.game.board.getAvailableSpacesForType(this.player, type);
        const title = (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : this.getTitle(type);
        if (spaces.length === 0) {
            return undefined;
        }
        return new SelectSpace_1.SelectSpace(title, spaces, (space) => {
            this.player.game.addCity(this.player, space);
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
//# sourceMappingURL=PlaceCityTile.js.map