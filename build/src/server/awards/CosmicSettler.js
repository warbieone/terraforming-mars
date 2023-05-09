"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmicSettler = void 0;
class CosmicSettler {
    constructor() {
        this.name = 'Cosmic Settler';
        this.description = 'Having the most city tiles not on Mars';
    }
    getScore(player) {
        return player.game.getCitiesOffMarsCount(player);
    }
}
exports.CosmicSettler = CosmicSettler;
