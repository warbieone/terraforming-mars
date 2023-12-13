"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biologist = void 0;
const Tag_1 = require("../../../common/cards/Tag");
class Biologist {
    constructor() {
        this.name = 'Biologist';
        this.description = 'Have the most animal, plant, and microbe tags in play';
    }
    getScore(player) {
        return player.tags.multipleCount([Tag_1.Tag.MICROBE, Tag_1.Tag.PLANT, Tag_1.Tag.ANIMAL], 'award');
    }
}
exports.Biologist = Biologist;
//# sourceMappingURL=Biologist.js.map