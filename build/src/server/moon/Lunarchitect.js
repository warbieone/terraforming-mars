"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lunarchitect = void 0;
const IMilestone_1 = require("../milestones/IMilestone");
const MoonExpansion_1 = require("./MoonExpansion");
class Lunarchitect extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Lunarchitect', 'Own 6 Moon tiles', 6);
    }
    getScore(player) {
        return MoonExpansion_1.MoonExpansion.ifElseMoon(player.game, (moonData) => {
            return moonData.moon.spaces.filter((space) => { var _a; return ((_a = space.player) === null || _a === void 0 ? void 0 : _a.id) === player.id; }).length;
        }, () => 0) || 0;
    }
}
exports.Lunarchitect = Lunarchitect;
