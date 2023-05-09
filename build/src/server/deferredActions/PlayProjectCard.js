"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayProjectCard = void 0;
const SelectProjectCardToPlay_1 = require("../inputs/SelectProjectCardToPlay");
const DeferredAction_1 = require("./DeferredAction");
class PlayProjectCard extends DeferredAction_1.DeferredAction {
    constructor(player, cb) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.cb = cb;
    }
    execute() {
        const playableCards = this.player.getPlayableCards();
        if (playableCards.length === 0) {
            return undefined;
        }
        return new SelectProjectCardToPlay_1.SelectProjectCardToPlay(this.player, playableCards, { cb: this.cb });
    }
}
exports.PlayProjectCard = PlayProjectCard;
