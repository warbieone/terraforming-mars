"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Adapter {
    constructor() {
        this.name = 'Adapter';
        this.description = 'Most cards in play with requirements';
    }
    getScore(player) {
        const validCards = player.playedCards.filter((card) => {
            const isValidCardType = card.type !== CardType_1.CardType.EVENT;
            const hasRequirements = card.requirements !== undefined;
            return isValidCardType && hasRequirements;
        });
        return validCards.length;
    }
}
exports.Adapter = Adapter;
