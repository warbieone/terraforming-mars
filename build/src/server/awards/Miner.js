"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miner = void 0;
class Miner {
    constructor() {
        this.name = 'Miner';
        this.description = 'Have the most steel and titanium';
    }
    getScore(player) {
        if (player.game.isDoneWithFinalProduction()) {
            return player.steel + player.titanium;
        }
        else {
            return player.steel + player.production.steel + player.titanium + player.production.titanium;
        }
    }
}
exports.Miner = Miner;
//# sourceMappingURL=Miner.js.map