"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecreaseAnyProduction = void 0;
const SelectPlayer_1 = require("../inputs/SelectPlayer");
const DeferredAction_1 = require("./DeferredAction");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class DecreaseAnyProduction extends DeferredAction_1.DeferredAction {
    constructor(player, resource, options = {
        count: 1,
        stealing: false,
    }, title = (0, MessageBuilder_1.message)('Select player to decrease ${0} production by ${1} step(s)', (b) => b.string(resource).number(options.count))) {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.resource = resource;
        this.options = options;
        this.title = title;
    }
    attack(target) {
        target.maybeBlockAttack(this.player, (proceed) => {
            if (proceed) {
                target.production.add(this.resource, -this.options.count, { log: true, from: this.player, stealing: this.options.stealing });
            }
            this.cb(proceed);
            return undefined;
        });
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.resolveInsuranceInSoloGame();
            this.cb(true);
        }
        else {
            const targets = this.player.game.getPlayers().filter((p) => p.canHaveProductionReduced(this.resource, this.options.count, this.player));
            if (targets.length === 0) {
                this.cb(false);
                return undefined;
            }
            if (targets.length > 0) {
                if (targets.length > 1 || targets[0] === this.player) {
                    return new SelectPlayer_1.SelectPlayer(targets, this.title, 'Decrease')
                        .andThen((candidate) => {
                        this.attack(candidate);
                        return undefined;
                    });
                }
                else {
                    this.attack(targets[0]);
                }
            }
        }
        return undefined;
    }
}
exports.DecreaseAnyProduction = DecreaseAnyProduction;
//# sourceMappingURL=DecreaseAnyProduction.js.map