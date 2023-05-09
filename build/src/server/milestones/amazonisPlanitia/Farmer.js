"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Farmer = void 0;
const IMilestone_1 = require("../IMilestone");
class Farmer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Farmer', 'Have 4 plant production', 4);
    }
    getScore(player) {
        return player.production.plants;
    }
}
exports.Farmer = Farmer;
