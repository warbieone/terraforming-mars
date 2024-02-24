"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scientist = void 0;
const Tag_1 = require("../../common/cards/Tag");
class Scientist {
    constructor() {
        this.name = 'Scientist';
        this.description = 'Have the most science tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.SCIENCE, 'award');
    }
}
exports.Scientist = Scientist;
