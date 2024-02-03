"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StealResources = void 0;
const Resource_1 = require("../../common/Resource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const CardName_1 = require("../../common/cards/CardName");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class StealResources extends DeferredAction_1.DeferredAction {
    constructor(player, resource, count = 1, title = (0, MessageBuilder_1.message)('Select player to steal up to ${0} ${1} from', (b) => b.number(count).string(resource))) {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.resource = resource;
        this.count = count;
        this.title = title;
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.stock.add(this.resource, this.count);
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        let candidates = this.player.game.getPlayers().filter((p) => p.id !== this.player.id && p.stock.get(this.resource) > 0);
        if (this.resource === Resource_1.Resource.PLANTS) {
            candidates = candidates.filter((p) => !p.plantsAreProtected());
        }
        if (this.resource === Resource_1.Resource.STEEL || this.resource === Resource_1.Resource.TITANIUM) {
            candidates = candidates.filter((p) => !p.alloysAreProtected());
        }
        if (candidates.length === 0) {
            return undefined;
        }
        const stealOptions = candidates.map((target) => {
            let qtyToSteal = Math.min(target.stock.get(this.resource), this.count);
            if (this.resource === Resource_1.Resource.PLANTS && target.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
                qtyToSteal = Math.ceil(qtyToSteal / 2);
            }
            return new SelectOption_1.SelectOption((0, MessageBuilder_1.message)('Steal ${0} ${1} from ${2}', (b) => b.number(qtyToSteal).string(this.resource).player(target)), 'Steal')
                .andThen(() => {
                target.maybeBlockAttack(this.player, (proceed) => {
                    if (proceed) {
                        target.stock.deduct(this.resource, qtyToSteal, { log: true, from: this.player, stealing: true });
                        this.player.stock.add(this.resource, qtyToSteal);
                    }
                    return undefined;
                });
                return undefined;
            });
        });
        return new OrOptions_1.OrOptions(...stealOptions, new SelectOption_1.SelectOption('Do not steal'));
    }
}
exports.StealResources = StealResources;
//# sourceMappingURL=StealResources.js.map