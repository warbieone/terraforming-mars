"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benefactor = void 0;
class Benefactor {
    constructor() {
        this.name = 'Benefactor';
        this.description = 'Have the highest terraform rating';
    }
    getScore(player) {
        return player.getTerraformRating();
    }
}
exports.Benefactor = Benefactor;
