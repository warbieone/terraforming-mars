"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voyager = void 0;
const Tag_1 = require("../../common/cards/Tag");
class Voyager {
    constructor() {
        this.name = 'Voyager';
        this.description = 'Having the most Jovian tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.JOVIAN, 'award');
    }
}
exports.Voyager = Voyager;
//# sourceMappingURL=Voyager.js.map