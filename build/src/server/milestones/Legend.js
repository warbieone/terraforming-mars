"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Legend = void 0;
const IMilestone_1 = require("./IMilestone");
class Legend extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Legend', 'Have played 5 events', 5);
    }
    getScore(player) {
        return player.getPlayedEventsCount();
    }
}
exports.Legend = Legend;
