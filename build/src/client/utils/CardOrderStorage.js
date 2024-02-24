"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardOrderStorage = void 0;
const utils_1 = require("@/common/utils/utils");
const STORAGE_PREFIX = 'cardOrder';
class CardOrderStorage {
    static getCardOrder(playerId) {
        try {
            const order = typeof localStorage === 'undefined' ? null : localStorage.getItem(`${STORAGE_PREFIX}${playerId}`);
            if (order === null) {
                return {};
            }
            return JSON.parse(order);
        }
        catch (err) {
            console.warn('unable to pull card order from local storage', err);
            return {};
        }
    }
    static getOrdered(order, cards) {
        const [misses, hits] = (0, utils_1.partition)(cards, (card) => order[card.name] === undefined);
        hits.sort((a, b) => {
            return order[a.name] - order[b.name];
        });
        return hits.concat(misses);
    }
    static updateCardOrder(playerId, order) {
        try {
            localStorage.setItem(`${STORAGE_PREFIX}${playerId}`, JSON.stringify(order));
        }
        catch (err) {
            console.warn('unable to update card order with local storage', err);
        }
    }
}
exports.CardOrderStorage = CardOrderStorage;
