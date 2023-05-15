"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceBaron = void 0;
const Tag_1 = require("../../common/cards/Tag");
class SpaceBaron {
    constructor() {
        this.name = 'Space Baron';
        this.description = 'Having the most space tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.SPACE, 'award');
    }
}
exports.SpaceBaron = SpaceBaron;
//# sourceMappingURL=SpaceBaron.js.map