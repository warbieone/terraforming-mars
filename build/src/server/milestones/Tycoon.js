"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tycoon = void 0;
const IMilestone_1 = require("./IMilestone");
const CardType_1 = require("../../common/cards/CardType");
class Tycoon extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Tycoon', 'Have 15 project cards (blue and green cards)', 15);
    }
    getScore(player) {
        return player.playedCards
            .filter((card) => card.type === CardType_1.CardType.ACTIVE || card.type === CardType_1.CardType.AUTOMATED).length;
    }
}
exports.Tycoon = Tycoon;
