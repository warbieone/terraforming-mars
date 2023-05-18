"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cultivator = void 0;
class Cultivator {
    constructor() {
        this.name = 'Cultivator';
        this.description = 'Own the most greenery tiles';
    }
    getScore(player) {
        return player.game.getGreeneriesCount(player);
    }
}
exports.Cultivator = Cultivator;
//# sourceMappingURL=Cultivator.js.map