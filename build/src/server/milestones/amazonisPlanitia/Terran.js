"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terran = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const IMilestone_1 = require("../IMilestone");
class Terran extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Terran', 'Have 6 Earth tags', 6);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.EARTH, 'milestone');
    }
}
exports.Terran = Terran;
