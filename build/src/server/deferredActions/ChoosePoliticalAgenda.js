"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoosePoliticalAgenda = void 0;
const OrOptions_1 = require("../inputs/OrOptions");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const Priority_1 = require("./Priority");
const Policy_1 = require("../turmoil/Policy");
const MessageBuilder_1 = require("../logs/MessageBuilder");
class ChoosePoliticalAgenda extends DeferredAction_1.DeferredAction {
    constructor(player, party, bonusCb, policyCb) {
        super(player, Priority_1.Priority.DEFAULT);
        this.party = party;
        this.bonusCb = bonusCb;
        this.policyCb = policyCb;
    }
    execute() {
        const players = this.player.game.getPlayers();
        const bonuses = this.party.bonuses.map((bonus) => {
            const description = (0, MessageBuilder_1.message)(bonus.description + ' (${0})', (b) => b.rawString(players.map((player) => player.name + ': ' + bonus.getScore(player)).join(' / ')));
            return new SelectOption_1.SelectOption(description).andThen(() => {
                this.bonusCb(bonus.id);
                return undefined;
            });
        });
        const orBonuses = new OrOptions_1.OrOptions(...bonuses);
        orBonuses.title = (0, MessageBuilder_1.message)('Select a ${0} bonus', (b) => b.party(this.party));
        const policies = this.party.policies.map((policy) => {
            return new SelectOption_1.SelectOption((0, Policy_1.policyDescription)(policy, this.player), 'Select')
                .andThen(() => {
                this.policyCb(policy.id);
                return undefined;
            });
        });
        const orPolicies = new OrOptions_1.OrOptions(...policies);
        orPolicies.title = (0, MessageBuilder_1.message)('Select a ${0} policy', (b) => b.party(this.party));
        return new OrOptions_1.OrOptions(orBonuses, orPolicies);
    }
}
exports.ChoosePoliticalAgenda = ChoosePoliticalAgenda;
