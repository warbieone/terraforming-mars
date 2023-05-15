"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historian = void 0;
class Historian {
    constructor() {
        this.name = 'Historian';
        this.description = 'Most event cards played';
    }
    getScore(player) {
        return player.getPlayedEventsCount();
    }
}
exports.Historian = Historian;
//# sourceMappingURL=Historian.js.map