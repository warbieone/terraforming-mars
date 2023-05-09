"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spacefarer = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const IMilestone_1 = require("../IMilestone");
class Spacefarer extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Spacefarer', 'Have 6 space tags', 6);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.SPACE);
    }
}
exports.Spacefarer = Spacefarer;
