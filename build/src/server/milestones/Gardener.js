"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gardener = void 0;
const IMilestone_1 = require("./IMilestone");
class Gardener extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Gardener', 'Own 3 greenery tiles', 3);
    }
    getScore(player) {
        return player.game.getGreeneriesCount(player);
    }
}
exports.Gardener = Gardener;
