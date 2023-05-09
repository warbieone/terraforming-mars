"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwardScorer = void 0;
const CardName_1 = require("../../common/cards/CardName");
const constants_1 = require("../../common/constants");
class AwardScorer {
    constructor(game, award) {
        this.scores = new Map();
        for (const player of game.getPlayers()) {
            let score = award.getScore(player);
            if (player.cardIsInEffect(CardName_1.CardName.ASIMOV))
                score += constants_1.ASIMOV_AWARD_BONUS;
            this.scores.set(player.id, score);
        }
    }
    get(player) {
        var _a;
        return (_a = this.scores.get(player.id)) !== null && _a !== void 0 ? _a : 0;
    }
}
exports.AwardScorer = AwardScorer;
