"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Celebrity = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Celebrity {
    constructor() {
        this.name = 'Celebrity';
        this.description = 'Have the most project cards in play with a base cost of at least 20 M€ (not events.)';
    }
    getScore(player) {
        return player.playedCards
            .filter((card) => (card.cost >= 20) && (card.type === CardType_1.CardType.ACTIVE || card.type === CardType_1.CardType.AUTOMATED)).length;
    }
}
exports.Celebrity = Celebrity;
