"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minimalist = void 0;
class Minimalist {
    constructor() {
        this.name = 'Minimalist';
        this.description = 'Have no more than 2 cards in hand';
    }
    getScore(player) {
        return player.cardsInHand.length;
    }
    canClaim(player) {
        return this.getScore(player) <= 2;
    }
}
exports.Minimalist = Minimalist;
