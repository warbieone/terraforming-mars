"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullMoon = void 0;
const Tag_1 = require("../../common/cards/Tag");
class FullMoon {
    constructor() {
        this.name = 'Full Moon';
        this.description = 'Have the most Moon tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.MOON, 'award');
    }
}
exports.FullMoon = FullMoon;
//# sourceMappingURL=FullMoon.js.map