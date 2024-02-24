"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Networker = void 0;
const IMilestone_1 = require("./IMilestone");
class Networker extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Networker', 'Have placed 3 tiles adjacent to tiles that grant adjacency bonuses', 3);
    }
    getScore(player) {
        return player.game.aresData?.milestoneResults.find((e) => e.id === player.id)?.count || 0;
    }
}
exports.Networker = Networker;
