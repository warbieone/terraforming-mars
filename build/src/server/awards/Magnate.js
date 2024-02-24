"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Magnate = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Magnate {
    constructor() {
        this.name = 'Magnate';
        this.description = 'Have the most automated (green) project cards in play';
    }
    getScore(player) {
        return player.playedCards
            .filter((card) => card.type === CardType_1.CardType.AUTOMATED).length;
    }
}
exports.Magnate = Magnate;
