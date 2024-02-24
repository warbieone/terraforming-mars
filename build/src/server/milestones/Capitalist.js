"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Capitalist = void 0;
const IMilestone_1 = require("./IMilestone");
class Capitalist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Capitalist', 'Have 64 M€', 64);
    }
    getScore(player) {
        return player.megaCredits;
    }
}
exports.Capitalist = Capitalist;
