"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardFromPlayerInput = exports.BasePlayerInput = void 0;
class BasePlayerInput {
    constructor(inputType, title = '') {
        this.buttonLabel = 'Save';
        this.inputType = inputType;
        this.title = title;
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
