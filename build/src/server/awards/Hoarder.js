"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hoarder = void 0;
class Hoarder {
    constructor() {
        this.name = 'Hoarder';
        this.description = 'Have the most cards in hand';
    }
    getScore(player) {
        return player.cardsInHand.length;
    }
}
exports.Hoarder = Hoarder;
