"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TPolitician = void 0;
class TPolitician {
    constructor() {
        this.name = 'T. Politician';
        this.description = 'Place the most delegates';
    }
    getScore(player) {
        return player.totalDelegatesPlaced;
    }
}
exports.TPolitician = TPolitician;
