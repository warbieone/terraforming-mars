"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mayor = void 0;
const IMilestone_1 = require("./IMilestone");
class Mayor extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Mayor', 'Own 3 city tiles', 3);
    }
    getScore(player) {
        return player.game.getCitiesCount(player);
    }
}
exports.Mayor = Mayor;
