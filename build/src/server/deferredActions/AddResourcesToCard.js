"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResourcesToCard = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("./DeferredAction");
const LogHelper_1 = require("../LogHelper");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class AddResourcesToCard extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, options = {}) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
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
        return [this.getCardsInPlay(), this.getSelfReplicatingRobotCards()];
    }
    execute() {
        if (this.options.robotCards !== true) {
            return this.execute1();
        }
        else {
            return this.execute2();
        }
    }
    execute1() {
        const count = this.options.count ?? 1;
        const title = this.options.title ??
            (0, MessageBuilder_1.message)('Select card to add ${0} ${1}', (b) => b.number(count).string(this.resourceType || 'resources'));
        const cards = this.getCardsInPlay();
        if (cards.length === 0) {
            return undefined;
        }
        if (cards.length === 1) {
            this.addResource(cards[0], count);
            return undefined;
        }
        return new SelectCard_1.SelectCard(title, count === 1 ? 'Add resource' : 'Add resources', cards)
            .andThen(([card]) => {
            this.addResource(card, count);
            return undefined;
        });
    }
    execute2() {
        const count = this.options.count ?? 1;
        const cards = this.getCardsInPlay();
        const robotCards = this.getSelfReplicatingRobotCards();
        return new SelectCard_1.SelectCard('Select card to add resource', 'Add resource', cards.concat(robotCards.map((c) => c.card)))
            .andThen(([card]) => {
            const robotCard = robotCards.find((c) => c.card.name === card.name);
            if (robotCard) {
                robotCard.resourceCount++;
                LogHelper_1.LogHelper.logAddResource(this.player, robotCard.card);
            }
            else {
                if (!cards.includes(card)) {
                    throw new Error('Invalid card selection');
                }
                this.addResource(card, count);
            }
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
