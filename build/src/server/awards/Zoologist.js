"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zoologist = void 0;
const CardResource_1 = require("../../common/CardResource");
class Zoologist {
    constructor() {
        this.name = 'Zoologist';
        this.description = 'Have the most animal resources';
    }
    getScore(player) {
        return player.getResourceCount(CardResource_1.CardResource.ANIMAL);
    }
}
exports.Zoologist = Zoologist;
