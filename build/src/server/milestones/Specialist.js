"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specialist = void 0;
const IMilestone_1 = require("./IMilestone");
class Specialist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Specialist', 'Have 10 in production of any resource', 10);
    }
    getScore(player) {
        return Math.max(player.production.megacredits, player.production.steel, player.production.titanium, player.production.plants, player.production.energy, player.production.heat);
    }
}
exports.Specialist = Specialist;
