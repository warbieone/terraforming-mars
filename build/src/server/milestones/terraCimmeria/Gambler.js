"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gambler = void 0;
const IMilestone_1 = require("../IMilestone");
class Gambler extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Gambler', 'Fund 2 awards', 2);
    }
    getScore(player) {
        return player.game.fundedAwards.filter((award) => award.player === player).length;
    }
}
exports.Gambler = Gambler;
