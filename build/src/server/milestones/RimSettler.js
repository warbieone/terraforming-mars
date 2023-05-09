"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RimSettler = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class RimSettler extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Rim Settler', 'Have 3 Jovian tags', 3);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.JOVIAN, 'milestone');
    }
}
exports.RimSettler = RimSettler;
