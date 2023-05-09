"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartyHooks = void 0;
const PartyName_1 = require("../../../common/turmoil/PartyName");
const SpaceType_1 = require("../../../common/boards/SpaceType");
const Phase_1 = require("../../../common/Phase");
const Resource_1 = require("../../../common/Resource");
const Greens_1 = require("./Greens");
const PoliticalAgendas_1 = require("../PoliticalAgendas");
const Turmoil_1 = require("../Turmoil");
const CardName_1 = require("../../../common/cards/CardName");
class PartyHooks {
    static applyMarsFirstRulingPolicy(player, spaceType) {
        if (this.shouldApplyPolicy(player, PartyName_1.PartyName.MARS, 'mfp01') &&
            spaceType !== SpaceType_1.SpaceType.COLONY) {
            player.addResource(Resource_1.Resource.STEEL, 1);
        }
    }
    static applyGreensRulingPolicy(player, space) {
        if (this.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp01')) {
            const greensPolicy = Greens_1.GREENS_POLICY_1;
            greensPolicy.onTilePlaced(player, space);
        }
    }
    static shouldApplyPolicy(player, partyName, policyId) {
        const game = player.game;
        return Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => {
            if (game.phase !== Phase_1.Phase.ACTION)
                return false;
            const rulingParty = turmoil.rulingParty;
            if (policyId === undefined) {
                policyId = rulingParty.policies[0].id;
            }
            if (partyName === PartyName_1.PartyName.REDS && player.cardIsInEffect(CardName_1.CardName.ZAN))
                return false;
            const currentPolicyId = PoliticalAgendas_1.PoliticalAgendas.currentAgenda(turmoil).policyId;
            return rulingParty.name === partyName && currentPolicyId === policyId;
        }, () => false);
    }
}
exports.PartyHooks = PartyHooks;
