"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planner = void 0;
const IMilestone_1 = require("./IMilestone");
class Planner extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Planner', 'Have 16 cards in your hand', 16);
    }
    getScore(player) {
        return player.cardsInHand.length;
    }
}
exports.Planner = Planner;
