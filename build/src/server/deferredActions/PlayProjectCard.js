"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayProjectCard = void 0;
const SelectProjectCardToPlay_1 = require("../inputs/SelectProjectCardToPlay");
const DeferredAction_1 = require("./DeferredAction");
class PlayProjectCard extends DeferredAction_1.DeferredAction {
    constructor(player) {
        super(player, DeferredAction_1.Priority.DEFAULT);
    }
    execute() {
        const playableCards = this.player.getPlayableCards();
        if (playableCards.length === 0) {
            this.cb(undefined);
            return undefined;
        }
        return new SelectProjectCardToPlay_1.SelectProjectCardToPlay(this.player, playableCards).andThen((card) => {
            this.cb(card);
            return undefined;
        });
    }
}
exports.PlayProjectCard = PlayProjectCard;
