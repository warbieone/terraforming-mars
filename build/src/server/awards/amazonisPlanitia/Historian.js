"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historian = void 0;
class Historian {
    constructor() {
        this.name = 'Historian';
        this.description = 'Have the most cards in your event pile';
    }
    getScore(player) {
        return player.getPlayedEventsCount();
    }
}
exports.Historian = Historian;
//# sourceMappingURL=Historian.js.map