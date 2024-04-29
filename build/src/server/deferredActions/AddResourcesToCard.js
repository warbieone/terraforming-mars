"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResourcesToCard = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
class AddResourcesToCard extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, options = {}) {
        super(player, Priority_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resourceType = resourceType;
        this.options = options;
    }
    getCardsInPlay() {
        let cards = this.player.getResourceCards(this.resourceType);
        const restrictedTag = this.options.restrictedTag;
        if (restrictedTag !== undefined) {
            cards = cards.filter((card) => card.tags.includes(restrictedTag));
        }
        if (this.options.filter !== undefined) {
            cards = cards.filter(this.options.filter);
        }
        const min = this.options.min;
        if (min) {
            cards = cards.filter((c) => c.resourceCount >= min);
        }
        return cards;
    }
    getSelfReplicatingRobotCards() {
        if (this.options.robotCards !== true) {
            return [];
        }
        let cards = this.player.getSelfReplicatingRobotsTargetCards();
        if (this.options.restrictedTag !== undefined) {
            throw new Error('restrictedTag does not work when filtering SRR cards');
        }
        if (this.options.filter !== undefined) {
            throw new Error('Filter does not work when filtering SRR cards');
        }
        if (this.options.min) {
            const min = this.options.min;
            cards = cards.filter((c) => c.resourceCount >= min);
        }
        return cards;
    }
    getCardCount() {
        return this.getCardsInPlay().length + this.getSelfReplicatingRobotCards().length;
    }
    getCards() {
        return [...this.getCardsInPlay(), ...this.getSelfReplicatingRobotCards()];
    }
    execute() {
        const qty = this.options.count ?? 1;
        const cards = this.getCards();
        if (cards.length === 0) {
            return undefined;
        }
        if (cards.length === 1) {
            this.addResource(cards[0], qty);
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select card to add resource', 'Add resource', cards)
            .andThen(([card]) => {
            this.addResource(card, qty);
            return undefined;
        });
    }
    addResource(card, qty) {
        const autoLog = this.options.log !== false;
        this.player.addResourceTo(card, { qty, log: autoLog });
        this.cb(undefined);
    }
}
exports.AddResourcesToCard = AddResourcesToCard;
