"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thermalist = void 0;
class Thermalist {
    constructor() {
        this.name = 'Thermalist';
        this.description = 'Having the most heat resource cubes (after final production round)';
    }
    getScore(player) {
        if (player.game.isDoneWithFinalProduction()) {
            return player.heat;
        }
        else {
            return player.energy + player.heat + player.production.heat;
        }
    }
}
exports.Thermalist = Thermalist;
