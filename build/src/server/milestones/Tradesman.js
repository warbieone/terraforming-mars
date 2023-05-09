"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tradesman = void 0;
const IMilestone_1 = require("./IMilestone");
class Tradesman extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Tradesman', 'Have 3 different types of non-standard resources', 3);
    }
    getScore(player) {
        const nonStandardResources = new Set(player.getCardsWithResources().map((card) => card.resourceType));
        return nonStandardResources.size;
    }
}
exports.Tradesman = Tradesman;
