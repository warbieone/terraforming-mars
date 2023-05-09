"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Energizer = void 0;
const IMilestone_1 = require("./IMilestone");
class Energizer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Energizer', 'Have 6 energy production', 6);
    }
    getScore(player) {
        return player.production.energy;
    }
}
exports.Energizer = Energizer;
