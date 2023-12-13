"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOceanTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
class PlaceOceanTile extends DeferredAction_1.DeferredAction {
    constructor(player, options = {}) {
        super(player, DeferredAction_1.Priority.PLACE_OCEAN_TILE);
        this.options = options;
    }
    execute() {
        var _a, _b, _c, _d;
        if (!this.player.game.canAddOcean()) {
            return undefined;
        }
        let title = (_a = this.options.title) !== null && _a !== void 0 ? _a : this.getTitle('ocean');
        let availableSpaces = [];
        if (this.options.spaces !== undefined) {
            availableSpaces = this.options.spaces;
        }
        else {
            const on = ((_b = this.options) === null || _b === void 0 ? void 0 : _b.on) || 'ocean';
            availableSpaces = this.player.game.board.getAvailableSpacesForType(this.player, on);
            title = (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.title) !== null && _d !== void 0 ? _d : this.getTitle(on);
        }
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            this.player.game.addOcean(this.player, space);
            this.cb(space);
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
//# sourceMappingURL=PlaceOceanTile.js.map