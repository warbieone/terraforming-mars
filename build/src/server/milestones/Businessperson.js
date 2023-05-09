"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Businessperson = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class Businessperson extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Businessperson', 'Have 6 Earth tags', 6);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.EARTH, 'milestone');
    }
}
exports.Businessperson = Businessperson;
