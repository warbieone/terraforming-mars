"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddResourcesToCards = void 0;
const DeferredAction_1 = require("./DeferredAction");
const SelectAmount_1 = require("../inputs/SelectAmount");
const AndOptions_1 = require("../inputs/AndOptions");
class AddResourcesToCards extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, count) {
        super(player, DeferredAction_1.Priority.GAIN_RESOURCE_OR_PRODUCTION);
        this.resourceType = resourceType;
        this.count = count;
    }
    execute() {
        if (this.count === 0) {
            return undefined;
        }
        const cards = this.player.getResourceCards(this.resourceType);
        if (cards.length === 0) {
            return undefined;
        }
        if (cards.length === 1) {
            this.player.addResourceTo(cards[0], { qty: this.count, log: true });
            return undefined;
        }
        const map = new Map();
        const options = cards.map((card) => {
            const cb = (amount) => {
                map.set(card.name, amount);
                return undefined;
            };
            return new SelectAmount_1.SelectAmount(card.name, '', cb, 0, this.count);
        });
        return new AndOptions_1.AndOptions(() => {
            let sum = 0;
            cards.forEach((card) => {
                var _a;
                sum += (_a = map.get(card.name)) !== null && _a !== void 0 ? _a : 0;
            });
            if (sum !== this.count) {
                throw new Error(`Expecting ${this.count} resources distributed, got ${sum}.`);
            }
            cards.forEach((card) => {
                var _a;
                const amount = (_a = map.get(card.name)) !== null && _a !== void 0 ? _a : 0;
                if (amount > 0) {
                    this.player.addResourceTo(card, { qty: amount, log: true });
                }
            });
            return undefined;
        }, ...options);
    }
}
exports.AddResourcesToCards = AddResourcesToCards;
