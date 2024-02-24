"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Adapter {
    constructor() {
        this.name = 'Adapter';
        this.description = 'Have the most cards with requirements in play';
    }
    getScore(player) {
        const validCards = player.playedCards.filter((card) => {
            return card.type !== CardType_1.CardType.EVENT && card.requirements.length > 0;
        });
        return validCards.length;
    }
}
exports.Adapter = Adapter;
