"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Curator = void 0;
const Tag_1 = require("../../../common/cards/Tag");
class Curator {
    constructor() {
        this.name = 'Curator';
        this.description = 'Having the most played tags of any one type';
    }
    getScore(player) {
        let max = 0;
        for (const tagString in Tag_1.Tag) {
            if (Object.prototype.hasOwnProperty.call(Tag_1.Tag, tagString)) {
                const tag = Tag_1.Tag[tagString];
                if (tag === Tag_1.Tag.EVENT)
                    continue;
                const count = player.tags.count(tag, 'award');
                if (count > max)
                    max = count;
            }
        }
        return max;
    }
}
exports.Curator = Curator;
//# sourceMappingURL=Curator.js.map