"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diversifier = void 0;
const IMilestone_1 = require("./IMilestone");
class Diversifier extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Diversifier', 'Have 8 different tags', 8);
    }
    getScore(player) {
        return player.tags.distinctCount('milestone');
    }
}
exports.Diversifier = Diversifier;
