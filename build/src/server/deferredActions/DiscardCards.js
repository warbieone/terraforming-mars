"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscardCards = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class DiscardCards extends DeferredAction_1.DeferredAction {
    constructor(player, min = 1, max = 1, title) {
        super(player, Priority_1.Priority.DISCARD_CARDS);
        this.min = min;
        this.max = max;
        this.title = title;
    }
    execute() {
        if (this.player.cardsInHand.length <= this.min) {
            const discards = [...this.player.cardsInHand];
            for (const card of discards) {
                this.player.discardCardFromHand(card);
            }
            this.cb(discards);
            return undefined;
        }
        let title = this.title;
        if (title === undefined) {
            if (this.min === this.max) {
                if (this.min === 1) {
                    title = 'Select 1 card to discard';
                }
                else {
                    title = (0, MessageBuilder_1.message)('Select ${0} cards to discard', (b) => b.number(this.min));
                }
            }
            else {
                title = (0, MessageBuilder_1.message)('Select between ${0} and ${1} cards to discard', (b) => b.number(this.min).number(this.max));
            }
        }
        return new SelectCard_1.SelectCard(title, 'Discard', this.player.cardsInHand, { min: this.min, max: this.max })
            .andThen((discards) => {
            for (const card of discards) {
                this.player.discardCardFromHand(card);
            }
            this.cb(discards);
            return undefined;
        });
    }
}
exports.DiscardCards = DiscardCards;
