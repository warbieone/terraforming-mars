"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Economizer2 = void 0;
const CardType_1 = require("../../../common/cards/CardType");
class Economizer2 {
    constructor() {
        this.name = 'T. Economizer';
        this.description = 'Most cards in play costing 10 M€ or less';
    }
    getScore(player) {
        const validCardTypes = [CardType_1.CardType.ACTIVE, CardType_1.CardType.AUTOMATED];
        return player.playedCards
            .filter((card) => (card.cost <= 10) && validCardTypes.includes(card.type)).length;
    }
}
exports.Economizer2 = Economizer2;
