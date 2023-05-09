"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Smith = void 0;
const IMilestone_1 = require("./IMilestone");
class Smith extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Smith', 'Have a total of 7 steel and titanium production', 7);
    }
    getScore(player) {
        return player.production.steel + player.production.titanium;
    }
}
exports.Smith = Smith;
