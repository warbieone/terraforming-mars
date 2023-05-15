"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Celebrity = void 0;
const CardType_1 = require("../../common/cards/CardType");
class Celebrity {
    constructor() {
        this.name = 'Celebrity';
        this.description = 'Most cards in play (not events) with a cost of at least 20 megacredits';
    }
    getScore(player) {
        return player.playedCards
            .filter((card) => (card.cost >= 20) && (card.type === CardType_1.CardType.ACTIVE || card.type === CardType_1.CardType.AUTOMATED)).length;
    }
}
exports.Celebrity = Celebrity;
//# sourceMappingURL=Celebrity.js.map