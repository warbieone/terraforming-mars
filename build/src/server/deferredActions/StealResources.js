"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StealResources = void 0;
const Resource_1 = require("../../common/Resource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const CardName_1 = require("../../common/cards/CardName");
class StealResources extends DeferredAction_1.DeferredAction {
    constructor(player, resource, count = 1, title = 'Select player to steal up to ' + count + ' ' + resource + ' from') {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.resource = resource;
        this.count = count;
        this.title = title;
    }
    execute() {
        if (this.player.game.isSoloMode()) {
            this.player.addResource(this.resource, this.count);
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        let candidates = this.player.game.getPlayers().filter((p) => p.id !== this.player.id && p.getResource(this.resource) > 0);
        if (this.resource === Resource_1.Resource.PLANTS) {
            candidates = candidates.filter((p) => !p.plantsAreProtected());
        }
        if (this.resource === Resource_1.Resource.STEEL || this.resource === Resource_1.Resource.TITANIUM) {
            candidates = candidates.filter((p) => !p.alloysAreProtected());
        }
        if (candidates.length === 0) {
            return undefined;
        }
        const stealOptions = candidates.map((candidate) => {
            let qtyToSteal = Math.min(candidate.getResource(this.resource), this.count);
            if (this.resource === Resource_1.Resource.PLANTS && candidate.cardIsInEffect(CardName_1.CardName.BOTANICAL_EXPERIENCE)) {
                qtyToSteal = Math.ceil(qtyToSteal / 2);
            }
            return new SelectOption_1.SelectOption('Steal ' + qtyToSteal + ' ' + this.resource + ' from ' + candidate.name, 'Steal', () => {
                candidate.deductResource(this.resource, qtyToSteal, { log: true, from: this.player, stealing: true });
                this.player.addResource(this.resource, qtyToSteal);
                return undefined;
            });
        });
        return new OrOptions_1.OrOptions(...stealOptions, new SelectOption_1.SelectOption('Do not steal', 'Confirm', () => {
            return undefined;
        }));
    }
}
exports.StealResources = StealResources;
