"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmicSettler = void 0;
class CosmicSettler {
    constructor() {
        this.name = 'Cosmic Settler';
        this.description = 'Own the most cities not on Mars';
    }
    getScore(player) {
        return player.game.getCitiesOffMarsCount(player);
    }
}
exports.CosmicSettler = CosmicSettler;
//# sourceMappingURL=CosmicSettler.js.map