"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneGiantStep = void 0;
const Tag_1 = require("../../common/cards/Tag");
const IMilestone_1 = require("../milestones/IMilestone");
class OneGiantStep extends IMilestone_1.BaseMilestone {
    constructor() {
        super('One Giant Step', 'Have 6 moon tags', 6);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.MOON, 'milestone');
    }
}
exports.OneGiantStep = OneGiantStep;
