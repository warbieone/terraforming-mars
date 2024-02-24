"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banker = void 0;
class Banker {
    constructor() {
        this.name = 'Banker';
        this.description = 'Have the most M€ production';
    }
    getScore(player) {
        return player.production.megacredits;
    }
}
exports.Banker = Banker;
