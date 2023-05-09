"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tactician = void 0;
const IMilestone_1 = require("./IMilestone");
const CardType_1 = require("../../common/cards/CardType");
class Tactician extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Tactician', 'Have 5 cards with requirements', 5);
        this.excludedCardTypes = [CardType_1.CardType.PRELUDE, CardType_1.CardType.EVENT];
    }
    getScore(player) {
        const validCards = player.playedCards.filter((card) => {
            const isValidCardType = !this.excludedCardTypes.includes(card.type);
            const hasRequirements = card.requirements !== undefined;
            return isValidCardType && hasRequirements;
        });
        return validCards.length;
    }
}
exports.Tactician = Tactician;
