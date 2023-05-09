"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseMilestone = void 0;
class BaseMilestone {
    constructor(name, description, threshold) {
        this.name = name;
        this.description = description;
        this.threshold = threshold;
    }
    canClaim(player) {
        return this.getScore(player) >= this.threshold;
    }
}
exports.BaseMilestone = BaseMilestone;
