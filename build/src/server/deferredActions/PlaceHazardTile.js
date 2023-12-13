"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceHazardTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const AresHazards_1 = require("../ares/AresHazards");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class PlaceHazardTile extends DeferredAction_1.DeferredAction {
    constructor(player, hazardType, options) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.hazardType = hazardType;
        this.options = options;
    }
    execute() {
        var _a;
        const type = 'land';
        const availableSpaces = this.player.game.board.getAvailableSpacesForType(this.player, type);
        if (availableSpaces.length === 0) {
            return undefined;
        }
        const hazardType = this.hazardType;
        const title = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.title) || (0, MessageBuilder_1.message)('Select space for ${0}', (b) => b.tileType(hazardType));
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            AresHazards_1._AresHazardPlacement.putHazardAt(space, hazardType);
            return undefined;
        });
    }
}
exports.PlaceHazardTile = PlaceHazardTile;
//# sourceMappingURL=PlaceHazardTile.js.map