"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecreaseAnyProduction = void 0;
const SelectPlayer_1 = require("../inputs/SelectPlayer");
const DeferredAction_1 = require("./DeferredAction");
class DecreaseAnyProduction extends DeferredAction_1.DeferredAction {
    constructor(player, resource, options = {
        count: 1,
        stealing: false,
    }, title = 'Select player to decrease ' + resource + ' production by ' + options.count + ' step(s)') {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.resource = resource;
        this.options = options;
        this.title = title;
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        const candidates = this.player.game.getPlayers().filter((p) => p.canHaveProductionReduced(this.resource, this.options.count, this.player));
        if (candidates.length === 0) {
            return undefined;
        }
        if (candidates.length === 1 && candidates[0] !== this.player) {
            candidates[0].production.add(this.resource, -this.options.count, { log: true, from: this.player, stealing: this.options.stealing });
            return undefined;
        }
        return new SelectPlayer_1.SelectPlayer(candidates, this.title, 'Decrease', (found) => {
            found.production.add(this.resource, -this.options.count, { log: true, from: this.player, stealing: this.options.stealing });
            return undefined;
        });
    }
}
exports.DecreaseAnyProduction = DecreaseAnyProduction;
