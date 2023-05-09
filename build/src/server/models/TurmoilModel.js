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
            if (turmoil.chairman === 'NEUTRAL') {
                chairman = Color_1.Color.NEUTRAL;
            }
            else {
                chairman = game.getPlayerById(turmoil.chairman).color;
            }
        }
        const dominant = turmoil.dominantParty.name;
        const ruling = turmoil.rulingParty.name;
        const reserve = [];
        const lobby = [];
        turmoil.delegateReserve.forEachMultiplicity((count, playerId) => {
            const color = playerId === 'NEUTRAL' ? Color_1.Color.NEUTRAL : game.getPlayerById(playerId).color;
            if (playerId !== 'NEUTRAL') {
                if (!turmoil.usedFreeDelegateAction.has(playerId)) {
                    count--;
                    lobby.push(color);
                }
            }
            reserve.push({ color, number: count });
        });
        const distant = globalEventToModel(turmoil.distantGlobalEvent);
        const coming = globalEventToModel(turmoil.comingGlobalEvent);
        const current = globalEventToModel(turmoil.currentGlobalEvent);
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
            distant,
            coming,
            current,
            politicalAgendas,
            policyActionUsers,
        };
    }, () => undefined);
}
exports.getTurmoilModel = getTurmoilModel;
function globalEventToModel(globalEvent) {
    if (globalEvent === undefined) {
        return undefined;
    }
    return {
        name: globalEvent.name,
        description: globalEvent.description,
        revealed: globalEvent.revealedDelegate,
        current: globalEvent.currentDelegate,
    };
}
function getParties(game) {
    return Turmoil_1.Turmoil.ifTurmoilElse(game, (turmoil) => {
        return turmoil.parties.map(function (party) {
            const delegates = [];
            for (const player of party.delegates.keys()) {
                const number = party.delegates.count(player);
                const color = player === 'NEUTRAL' ? Color_1.Color.NEUTRAL : game.getPlayerById(player).color;
                delegates.push({ color, number });
            }
            let partyLeader;
            if (party.partyLeader) {
                if (party.partyLeader === 'NEUTRAL') {
                    partyLeader = Color_1.Color.NEUTRAL;
                }
                else {
                    partyLeader = game.getPlayerById(party.partyLeader).color;
                }
            }
            return {
                name: party.name,
                description: party.description,
                partyLeader: partyLeader,
                delegates: delegates,
            };
        });
    }, () => []);
}
