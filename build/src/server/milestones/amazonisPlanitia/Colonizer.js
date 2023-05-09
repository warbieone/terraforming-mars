"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Colonizer = void 0;
const IMilestone_1 = require("../IMilestone");
class Colonizer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Colonizer', 'Have built 4 colonies', 4);
    }
    getScore(player) {
        return player.getColoniesCount();
    }
}
exports.Colonizer = Colonizer;
