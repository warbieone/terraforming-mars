"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResourcesToCard = void 0;
const SelectCard_1 = require("../inputs/SelectCard");
const DeferredAction_1 = require("./DeferredAction");
class AddResourcesToCard extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, options = {}) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resourceType = resourceType;
        this.options = options;
    }
    getCards() {
        let cards = this.player.getResourceCards(this.resourceType);
        const restrictedTag = this.options.restrictedTag;
        if (restrictedTag !== undefined) {
            cards = cards.filter((card) => card.tags.includes(restrictedTag));
        }
        if (this.options.filter !== undefined) {
            cards = cards.filter(this.options.filter);
        }
        return cards;
    }
    execute() {
        var _a, _b;
        const count = (_a = this.options.count) !== null && _a !== void 0 ? _a : 1;
        const title = (_b = this.options.title) !== null && _b !== void 0 ? _b : 'Select card to add ' + count + ' ' + (this.resourceType || 'resources') + '(s)';
        const cards = this.getCards();
        if (cards.length === 0) {
            return undefined;
        }
        if (cards.length === 1) {
            this.addResource(cards[0], count);
            return undefined;
        }
        return new SelectCard_1.SelectCard(title, count === 1 ? 'Add resource' : 'Add resources', cards, ([card]) => {
            this.addResource(card, count);
            return undefined;
        });
    }
    addResource(card, qty) {
        var _a, _b;
        const autoLog = this.options.log === undefined;
        this.player.addResourceTo(card, { qty, log: autoLog });
        (_b = (_a = this.options).log) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
}
exports.AddResourcesToCard = AddResourcesToCard;
