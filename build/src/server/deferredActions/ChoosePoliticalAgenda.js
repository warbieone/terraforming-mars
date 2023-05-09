"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoosePoliticalAgenda = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
class ChoosePoliticalAgenda extends DeferredAction_1.DeferredAction {
    constructor(player, party, bonusCb, policyCb) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.party = party;
        this.bonusCb = bonusCb;
        this.policyCb = policyCb;
    }
    execute() {
        const players = this.player.game.getPlayers();
        const bonuses = this.party.bonuses.map((bonus) => {
            const description = bonus.description + ' (' + players.map((player) => player.name + ': ' + bonus.getScore(player)).join(' / ') + ')';
            return new SelectOption_1.SelectOption(description, 'Select', () => {
                this.bonusCb(bonus.id);
                return undefined;
            });
        });
        const orBonuses = new OrOptions_1.OrOptions(...bonuses);
        orBonuses.title = 'Select a ' + this.party.name + ' bonus.';
        const policies = this.party.policies.map((policy) => {
            const description = typeof (policy.description) === 'string' ? policy.description : policy.description(this.player);
            return new SelectOption_1.SelectOption(description, 'Select', () => {
                this.policyCb(policy.id);
                return undefined;
            });
        });
        const orPolicies = new OrOptions_1.OrOptions(...policies);
        orPolicies.title = 'Select a ' + this.party.name + ' policy.';
        return new OrOptions_1.OrOptions(orBonuses, orPolicies);
    }
}
exports.ChoosePoliticalAgenda = ChoosePoliticalAgenda;
