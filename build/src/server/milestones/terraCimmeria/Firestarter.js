"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firestarter = void 0;
const IMilestone_1 = require("../IMilestone");
class Firestarter extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Firestarter', 'Have 20 heat', 20);
    }
    getScore(player) {
        return player.heat;
    }
}
exports.Firestarter = Firestarter;
