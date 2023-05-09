"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Martian = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class Martian extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Martian', 'Have 4 Mars tags', 4);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.MARS, 'milestone');
    }
}
exports.Martian = Martian;
