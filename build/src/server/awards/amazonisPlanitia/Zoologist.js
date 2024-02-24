"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zoologist2 = void 0;
const CardResource_1 = require("../../../common/CardResource");
class Zoologist2 {
    constructor() {
        this.name = 'A. Zoologist';
        this.description = 'Own the most animal and microbe resources';
    }
    getScore(player) {
        const resourceTypes = [CardResource_1.CardResource.ANIMAL, CardResource_1.CardResource.MICROBE];
        let score = 0;
        player.getCardsWithResources().filter((card) => card.resourceType !== undefined && resourceTypes.includes(card.resourceType)).forEach((card) => {
            score += card.resourceCount;
        });
        return score;
    }
}
exports.Zoologist2 = Zoologist2;
