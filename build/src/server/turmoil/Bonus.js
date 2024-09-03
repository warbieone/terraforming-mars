"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bonus = void 0;
class Bonus {
    grant(game) {
        for (const player of game.getPlayersInGenerationOrder()) {
            if (player.alliedParty === undefined) {
                this.grantForPlayer?.(player);
            }
        }
    }
}
exports.Bonus = Bonus;
