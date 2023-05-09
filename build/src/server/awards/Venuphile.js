"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venuphile = void 0;
const Tag_1 = require("../../common/cards/Tag");
class Venuphile {
    constructor() {
        this.name = 'Venuphile';
        this.description = 'Having the most Venus tags in play';
    }
    getScore(player) {
        return player.tags.count(Tag_1.Tag.VENUS, 'award');
    }
}
exports.Venuphile = Venuphile;
