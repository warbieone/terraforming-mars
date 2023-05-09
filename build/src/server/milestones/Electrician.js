"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Electrician = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class Electrician extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Electrician', 'Have 4 power tags', 4);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.POWER, 'milestone');
    }
}
exports.Electrician = Electrician;
