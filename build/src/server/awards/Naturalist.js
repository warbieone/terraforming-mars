"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Naturalist = void 0;
class Naturalist {
    constructor() {
        this.name = 'Naturalist';
        this.description = 'Have the most plant and heat production';
    }
    getScore(player) {
        return player.production.heat + player.production.plants;
    }
}
exports.Naturalist = Naturalist;
