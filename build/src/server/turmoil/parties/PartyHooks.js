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
            player.stock.add(Resource_1.Resource.STEEL, 1);
        }
    }
    static applyGreensRulingPolicy(player, space) {
        if (this.shouldApplyPolicy(player, PartyName_1.PartyName.GREENS, 'gp01')) {
            const greensPolicy = Greens_1.GREENS_POLICY_1;
            greensPolicy.onTilePlaced(player, space);
        }
    }
    static shouldApplyPolicy(player, partyName, policyId) {
        if (player.game.phase !== Phase_1.Phase.ACTION) {
            return false;
        }
        return Turmoil_1.Turmoil.ifTurmoilElse(player.game, (turmoil) => {
            if (partyName === PartyName_1.PartyName.REDS && player.cardIsInEffect(CardName_1.CardName.ZAN)) {
                return false;
            }
            const alliedPartyPolicy = player.alliedParty?.agenda.policyId;
            if (policyId === alliedPartyPolicy && player.alliedParty?.partyName !== PartyName_1.PartyName.REDS) {
                return true;
            }
            const currentPolicyId = PoliticalAgendas_1.PoliticalAgendas.currentAgenda(turmoil).policyId;
            return turmoil.rulingParty.name === partyName && currentPolicyId === policyId;
        }, () => false);
    }
}
exports.PartyHooks = PartyHooks;
