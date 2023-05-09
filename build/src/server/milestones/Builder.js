"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const IMilestone_1 = require("./IMilestone");
const Tag_1 = require("../../common/cards/Tag");
class Builder extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Builder', 'Have 8 building tags', 8);
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.BUILDING, 'milestone');
    }
}
exports.Builder = Builder;
