"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excentric = void 0;
class Excentric {
    constructor() {
        this.name = 'Excentric';
        this.description = 'Most resources on cards';
    }
    getScore(player) {
        let score = 0;
        player.getCardsWithResources().forEach((card) => {
            score += card.resourceCount;
        });
        return score;
    }
}
exports.Excentric = Excentric;
