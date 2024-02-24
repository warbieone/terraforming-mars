"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTurmoilModel = void 0;
const Color_1 = require("../../common/Color");
const PartyName_1 = require("../../common/turmoil/PartyName");
const PoliticalAgendas_1 = require("../turmoil/PoliticalAgendas");
const Turmoil_1 = require("../turmoil/Turmoil");
function getTurmoilModel(game) {
    return Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => {
        const parties = getParties(game);
        let chairman;
        if (turmoil.chairman) {
            chairman = delegateColor(turmoil.chairman);
        }
        const dominant = turmoil.dominantParty.name;
        const ruling = turmoil.rulingParty.name;
        const reserve = [];
        const lobby = [];
        turmoil.delegateReserve.forEachMultiplicity((count, delegate) => {
            const color = delegateColor(delegate);
            if (delegate !== 'NEUTRAL') {
                if (!turmoil.usedFreeDelegateAction.has(delegate)) {
                    count--;
                    lobby.push(color);
                }
            }
            reserve.push({
                color: color,
                number: count,
            });
        });
        const politicalAgendas = {
            marsFirst: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.MARS),
            scientists: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.SCIENTISTS),
            unity: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.UNITY),
            greens: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.GREENS),
            reds: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.REDS),
            kelvinists: PoliticalAgendas_1.PoliticalAgendas.getAgenda(turmoil, PartyName_1.PartyName.KELVINISTS),
        };
        const policyActionUsers = Array.from(game.getPlayersInGenerationOrder(), (player) => {
            return {
                color: player.color,
                turmoilPolicyActionUsed: player.turmoilPolicyActionUsed,
                politicalAgendasActionUsedCount: player.politicalAgendasActionUsedCount
            };
        });
        return {
            chairman,
            ruling,
            dominant,
            parties,
            lobby,
            reserve,
            distant: turmoil.distantGlobalEvent?.name,
            coming: turmoil.comingGlobalEvent?.name,
            current: turmoil.currentGlobalEvent?.name,
            politicalAgendas,
            policyActionUsers,
        };
    }, () => undefined);
}
exports.getTurmoilModel = getTurmoilModel;
function getParties(game) {
    return Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => {
        return turmoil.parties.map(function (party) {
            const delegates = [];
            for (const player of party.delegates.keys()) {
                const number = party.delegates.count(player);
                delegates.push({
                    color: delegateColor(player),
                    number,
                });
            }
            const partyLeader = party.partyLeader === undefined ? undefined : delegateColor(party.partyLeader);
            return {
                name: party.name,
                partyLeader: partyLeader,
                delegates: delegates,
            };
        });
    }, () => []);
}
function delegateColor(delegate) {
    return delegate === 'NEUTRAL' ? Color_1.Color.NEUTRAL : delegate.color;
}
