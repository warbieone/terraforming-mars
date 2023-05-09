"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticalAgendas = void 0;
const ChoosePoliticalAgenda_1 = require("../deferredActions/ChoosePoliticalAgenda");
const Types_1 = require("../../common/turmoil/Types");
class PoliticalAgendas {
    static newInstance(agendaStyle, parties) {
        const agendas = new Map();
        parties.forEach((p) => {
            if (agendaStyle === Types_1.AgendaStyle.STANDARD) {
                agendas.set(p.name, { bonusId: p.bonuses[0].id, policyId: p.policies[0].id });
            }
            else {
                agendas.set(p.name, PoliticalAgendas.getRandomAgenda(p));
            }
        });
        return {
            agendas: agendas,
            agendaStyle: agendaStyle,
        };
    }
    static getRandomAgenda(party) {
        const bonus = PoliticalAgendas.randomElement(party.bonuses);
        const policy = PoliticalAgendas.randomElement(party.policies);
        return { bonusId: bonus.id, policyId: policy.id };
    }
    static currentAgenda(turmoil) {
        return this.getAgenda(turmoil, turmoil.rulingParty.name);
    }
    static getAgenda(turmoil, partyName) {
        const agenda = turmoil.politicalAgendasData.agendas.get(partyName);
        if (agenda === undefined) {
            throw new Error('Invalid party: ' + partyName);
        }
        return agenda;
    }
    static setNextAgenda(turmoil, game) {
        const rulingParty = turmoil.rulingParty;
        const politicalAgendasData = turmoil.politicalAgendasData;
        const chairman = turmoil.chairman;
        if (chairman === undefined) {
            throw new Error('Chairman not defined');
        }
        if (politicalAgendasData.agendaStyle === Types_1.AgendaStyle.CHAIRMAN && chairman !== 'NEUTRAL') {
            const agenda = this.getAgenda(turmoil, rulingParty.name);
            game.defer(new ChoosePoliticalAgenda_1.ChoosePoliticalAgenda(game.getPlayerById(chairman), rulingParty, (bonusId) => {
                agenda.bonusId = bonusId;
                turmoil.onAgendaSelected(game);
            }, (policyId) => {
                agenda.policyId = policyId;
                turmoil.onAgendaSelected(game);
            }));
        }
        else {
            turmoil.onAgendaSelected(game);
        }
    }
    static serialize(agenda) {
        return {
            agendas: Array.from(agenda.agendas.entries()),
            agendaStyle: agenda.agendaStyle,
        };
    }
    static deserialize(d) {
        return {
            agendas: new Map(d.agendas),
            agendaStyle: d.agendaStyle,
        };
    }
    static defaultRandomElement(list) {
        const rng = Math.floor(Math.random() * list.length);
        return list[rng];
    }
}
exports.PoliticalAgendas = PoliticalAgendas;
PoliticalAgendas.randomElement = PoliticalAgendas.defaultRandomElement;
