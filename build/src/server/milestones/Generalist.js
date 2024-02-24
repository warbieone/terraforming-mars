"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generalist = void 0;
const IMilestone_1 = require("./IMilestone");
class Generalist extends IMilestone_1.BaseMilestone {
    constructor() {
        super('Generalist', 'Have increased all 6 productions by 1 step', 6);
    }
    getScore(player) {
        let score = 0;
        const requiredProduction = player.game.gameOptions.corporateEra ? 0 : 1;
        if (player.production.megacredits > requiredProduction)
            score++;
        if (player.production.steel > requiredProduction)
            score++;
        if (player.production.titanium > requiredProduction)
            score++;
        if (player.production.plants > requiredProduction)
            score++;
        if (player.production.energy > requiredProduction)
            score++;
        if (player.production.heat > requiredProduction)
            score++;
        return score;
    }
}
exports.Generalist = Generalist;
