"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Benefactor = void 0;
class Benefactor {
    constructor() {
        this.name = 'Benefactor';
        this.description = 'Highest terraform rating';
    }
    getScore(player) {
        return player.getTerraformRating();
    }
}
exports.Benefactor = Benefactor;
//# sourceMappingURL=Benefactor.js.map