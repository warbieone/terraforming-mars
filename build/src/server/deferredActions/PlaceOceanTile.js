"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceOceanTile = void 0;
const SelectSpace_1 = require("../inputs/SelectSpace");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const CardName_1 = require("../../common/cards/CardName");
class PlaceOceanTile extends DeferredAction_1.DeferredAction {
    constructor(player, options = {}) {
        super(player, Priority_1.Priority.PLACE_OCEAN_TILE);
        this.options = options;
    }
    execute() {
        if (!this.player.game.canAddOcean()) {
            const whales = this.player.getPlayedCard(CardName_1.CardName.WHALES);
            if (whales !== undefined) {
                this.player.addResourceTo(whales, { qty: 1, log: true });
            }
            return undefined;
        }
        let title = this.options.title ?? this.getTitle('ocean');
        let availableSpaces = [];
        if (this.options.spaces !== undefined) {
            availableSpaces = this.options.spaces;
        }
        else {
            const on = this.options?.on || 'ocean';
            availableSpaces = this.player.game.board.getAvailableSpacesForType(this.player, on);
            title = this.options?.title ?? this.getTitle(on);
        }
        return new SelectSpace_1.SelectSpace(title, availableSpaces)
            .andThen((space) => {
            const creditedPlayer = this.options.creditedPlayer ?? this.player;
            creditedPlayer.game.addOcean(creditedPlayer, space);
            creditedPlayer.defer(this.cb(space));
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
