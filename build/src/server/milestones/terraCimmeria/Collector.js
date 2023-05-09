"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collector = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const IMilestone_1 = require("../IMilestone");
class Collector extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Collector', 'Have 3 sets of automated, active and event cards', 3);
    }
    getScore(player) {
        const numAutomatedCards = player.playedCards.filter((card) => card.type === CardType_1.CardType.AUTOMATED).length;
        const numActiveCards = player.playedCards.filter((card) => card.type === CardType_1.CardType.ACTIVE).length;
        const numEventCards = player.getPlayedEventsCount();
        return Math.min(numAutomatedCards, numActiveCards, numEventCards);
    }
}
exports.Collector = Collector;
