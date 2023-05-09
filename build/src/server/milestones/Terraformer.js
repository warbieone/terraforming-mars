"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terraformer = void 0;
const Turmoil_1 = require("../turmoil/Turmoil");
class Terraformer {
    constructor() {
        this.name = 'Terraformer';
        this.terraformRating = 35;
        this.terraformRatingTurmoil = 26;
        this.description = 'Have a terraform rating of 35 (or 26 with Turmoil.)';
    }
    getScore(player) {
        return player.getTerraformRating();
    }
    canClaim(player) {
        const target = Turmoil_1.Turmoil.ifTurmoilElse(player.game, () => this.terraformRatingTurmoil, () => this.terraformRating);
        const score = this.getScore(player);
        return score >= target;
    }
}
exports.Terraformer = Terraformer;
