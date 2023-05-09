"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Botanist = void 0;
class Botanist {
    constructor() {
        this.name = 'Botanist';
        this.description = 'Having the highest plant production';
    }
    getScore(player) {
        return player.production.plants;
    }
}
exports.Botanist = Botanist;
