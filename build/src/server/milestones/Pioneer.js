"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pioneer = void 0;
const IMilestone_1 = require("./IMilestone");
class Pioneer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Pioneer', 'Have built 3 colonies', 3);
    }
    getScore(player) {
        return player.getColoniesCount();
    }
}
exports.Pioneer = Pioneer;
