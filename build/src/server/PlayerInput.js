"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardFromPlayerInput = exports.BasePlayerInput = void 0;
const NULL_FUNCTION = () => undefined;
class BasePlayerInput {
    constructor(type, title = '') {
        this.buttonLabel = 'Save';
        this.cb = NULL_FUNCTION;
        this.eligibleForDefault = undefined;
        this.type = type;
        this.title = title;
    }
    andThen(cb) {
        if (this.cb !== NULL_FUNCTION) {
            const THROW_STATE_ERRORS = Boolean(process.env.THROW_STATE_ERRORS);
            if (THROW_STATE_ERRORS) {
                throw new Error('andThen called twice');
            }
            else {
                console.error('andThen called twice');
                return this;
            }
        }
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
