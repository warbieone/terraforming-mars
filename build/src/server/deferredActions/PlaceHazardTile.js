"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceHazardTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const AresHazards_1 = require("../ares/AresHazards");
const MessageBuilder_1 = require("../logs/MessageBuilder");
const LogHelper_1 = require("../LogHelper");
class PlaceHazardTile extends DeferredAction_1.DeferredAction {
    constructor(player, hazardType, options) {
        super(player, Priority_1.Priority.DEFAULT);
        this.hazardType = hazardType;
        this.options = options;
    }
    execute() {
        const availableSpaces = this.options?.spaces ?? this.player.game.board.getAvailableSpacesForType(this.player, 'land');
        if (availableSpaces.length === 0) {
            return undefined;
        }
        const hazardType = this.hazardType;
        const title = this.options?.title || (0, MessageBuilder_1.message)('Select space for ${0}', (b) => b.tileType(hazardType));
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            AresHazards_1._AresHazardPlacement.putHazardAt(space, hazardType);
            LogHelper_1.LogHelper.logTilePlacement(this.player, space, this.hazardType);
            this.cb(space);
            return undefined;
        });
    }
}
exports.PlaceHazardTile = PlaceHazardTile;
