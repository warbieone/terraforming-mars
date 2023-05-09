"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Economizer = void 0;
const IMilestone_1 = require("./IMilestone");
class Economizer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Economizer', 'Have 5 heat production', 5);
    }
    getScore(player) {
        return player.production.heat;
    }
}
exports.Economizer = Economizer;
