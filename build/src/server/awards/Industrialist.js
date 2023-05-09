"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Industrialist = void 0;
class Industrialist {
    constructor() {
        this.name = 'Industrialist';
        this.description = 'Having most steel and energy resources (after final production round)';
    }
    getScore(player) {
        if (player.game.isDoneWithFinalProduction()) {
            return player.steel + player.energy;
        }
        else {
            return player.steel + player.production.steel + player.production.energy;
        }
    }
}
exports.Industrialist = Industrialist;
