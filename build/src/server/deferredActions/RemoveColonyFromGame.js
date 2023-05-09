"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveColonyFromGame = void 0;
const SelectColony_1 = require("../inputs/SelectColony");
const DeferredAction_1 = require("./DeferredAction");
class RemoveColonyFromGame extends DeferredAction_1.DeferredAction {
    constructor(player) {
        super(player, DeferredAction_1.Priority.DEFAULT);
    }
    execute() {
        const game = this.player.game;
        const removeColony = new SelectColony_1.SelectColony('Select colony tile to remove', 'Remove colony', game.colonies, (colony) => {
            game.colonies.splice(game.colonies.indexOf(colony), 1);
            game.discardedColonies.push(colony);
            game.log('You discarded ${0}', (b) => b.colony(colony));
            return undefined;
        });
        removeColony.showTileOnly = true;
        return removeColony;
    }
}
exports.RemoveColonyFromGame = RemoveColonyFromGame;
