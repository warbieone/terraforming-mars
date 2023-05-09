"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ecologist = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class Ecologist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Ecologist', 'Have 4 bio tags (plant, microbe and animal tags count as bio tags)', 4);
    }
    getScore(player) {
        const tags = [Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL, Tag_1.Tag.MICROBE];
        return player.tags.multipleCount(tags, 'milestone');
    }
}
exports.Ecologist = Ecologist;
