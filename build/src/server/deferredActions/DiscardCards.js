"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscardCards = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("./DeferredAction");
class DiscardCards extends DeferredAction_1.DeferredAction {
    constructor(player, count = 1, title = 'Select ' + count + ' card' + (count > 1 ? 's' : '') + ' to discard') {
        super(player, DeferredAction_1.Priority.DISCARD_CARDS);
        this.count = count;
        this.title = title;
    }
    execute() {
        if (this.player.cardsInHand.length <= this.count) {
            const cards = this.player.cardsInHand.splice(0, this.player.cardsInHand.length);
            cards.forEach((card) => this.player.game.projectDeck.discard(card));
            return undefined;
        }
        return new SelectCard_1.SelectCard(this.title, 'Discard', this.player.cardsInHand, (cards) => {
            for (const card of cards) {
                this.player.cardsInHand.splice(this.player.cardsInHand.indexOf(card), 1);
                this.player.game.projectDeck.discard(card);
            }
            return undefined;
        }, { min: this.count, max: this.count });
    }
}
exports.DiscardCards = DiscardCards;
