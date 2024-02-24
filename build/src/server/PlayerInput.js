"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardFromPlayerInput = exports.BasePlayerInput = void 0;
class BasePlayerInput {
    constructor(type, title = '') {
        this.buttonLabel = 'Save';
        this.cb = () => undefined;
        this.eligibleForDefault = undefined;
        this.type = type;
        this.title = title;
    }
    andThen(cb) {
        this.cb = cb;
        return this;
    }
}
exports.BasePlayerInput = BasePlayerInput;
function getCardFromPlayerInput(cards, cardName) {
    const idx = cards.findIndex((card) => card.name === cardName);
    if (idx === -1) {
        throw new Error(`Card ${cardName} not found`);
    }
    const card = cards[idx];
    return { card, idx };
}
exports.getCardFromPlayerInput = getCardFromPlayerInput;
