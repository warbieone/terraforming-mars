"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Networker = void 0;
const IMilestone_1 = require("./IMilestone");
class Networker extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Networker', 'Have placed 3 tiles adjacent to tiles that grant adjacency bonuses', 3);
    }
    getScore(player) {
        var _a, _b;
        return ((_b = (_a = player.game.aresData) === null || _a === void 0 ? void 0 : _a.milestoneResults.find((e) => e.id === player.id)) === null || _b === void 0 ? void 0 : _b.count) || 0;
    }
}
exports.Networker = Networker;
