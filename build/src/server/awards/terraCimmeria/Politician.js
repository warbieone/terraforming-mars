"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Politician = void 0;
class Politician {
    constructor() {
        this.name = 'Politician';
        this.description = 'Place the most delegates';
    }
    getScore(player) {
        return player.totalDelegatesPlaced;
    }
}
exports.Politician = Politician;
