"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Turmoil = exports.ALL_PARTIES = void 0;
const PartyName_1 = require("../../common/turmoil/PartyName");
const MarsFirst_1 = require("./parties/MarsFirst");
const Scientists_1 = require("./parties/Scientists");
const Unity_1 = require("./parties/Unity");
const Kelvinists_1 = require("./parties/Kelvinists");
const Reds_1 = require("./parties/Reds");
const Greens_1 = require("./parties/Greens");
const GlobalEventDealer_1 = require("./globalEvents/GlobalEventDealer");
const constants_1 = require("../../common/constants");
const PoliticalAgendas_1 = require("./PoliticalAgendas");
const Types_1 = require("../../common/turmoil/Types");
const CardName_1 = require("../../common/cards/CardName");
const DeferredAction_1 = require("../deferredActions/DeferredAction");
const SelectOption_1 = require("../inputs/SelectOption");
const OrOptions_1 = require("../inputs/OrOptions");
const mnemonist_1 = require("mnemonist");
exports.ALL_PARTIES = [
    { partyName: PartyName_1.PartyName.MARS, Factory: MarsFirst_1.MarsFirst },
    { partyName: PartyName_1.PartyName.SCIENTISTS, Factory: Scientists_1.Scientists },
    { partyName: PartyName_1.PartyName.UNITY, Factory: Unity_1.Unity },
    { partyName: PartyName_1.PartyName.GREENS, Factory: Greens_1.Greens },
    { partyName: PartyName_1.PartyName.REDS, Factory: Reds_1.Reds },
    { partyName: PartyName_1.PartyName.KELVINISTS, Factory: Kelvinists_1.Kelvinists },
];
const UNINITIALIZED_POLITICAL_AGENDAS_DATA = {
    agendas: new Map(),
    agendaStyle: Types_1.AgendaStyle.CHAIRMAN,
};
class Turmoil {
    constructor(rulingPartyName, chairman, dominantPartyName, globalEventDealer) {
        this.chairman = undefined;
        this.usedFreeDelegateAction = new Set();
        this.delegateReserve = new mnemonist_1.MultiSet();
        this.parties = exports.ALL_PARTIES.map((cf) => new cf.Factory());
        this.playersInfluenceBonus = new Map();
        this.politicalAgendasData = UNINITIALIZED_POLITICAL_AGENDAS_DATA;
        this.rulingParty = this.getPartyByName(rulingPartyName);
        this.chairman = chairman;
        this.dominantParty = this.getPartyByName(dominantPartyName);
        this.globalEventDealer = globalEventDealer;
    }
    static newInstance(game, agendaStyle = Types_1.AgendaStyle.STANDARD) {
        const dealer = GlobalEventDealer_1.GlobalEventDealer.newInstance(game);
        const turmoil = new Turmoil(PartyName_1.PartyName.GREENS, 'NEUTRAL', PartyName_1.PartyName.GREENS, dealer);
        game.log('A neutral delegate is the new chairman.');
        game.log('Greens are in power in the first generation.');
        turmoil.parties = exports.ALL_PARTIES.map((cf) => new cf.Factory());
        game.getPlayersInGenerationOrder().forEach((player) => {
            turmoil.delegateReserve.add(player.id, constants_1.DELEGATES_PER_PLAYER);
        });
        turmoil.delegateReserve.add('NEUTRAL', constants_1.DELEGATES_FOR_NEUTRAL_PLAYER - 1);
        turmoil.politicalAgendasData = PoliticalAgendas_1.PoliticalAgendas.newInstance(agendaStyle, turmoil.parties);
        turmoil.onAgendaSelected(game);
        turmoil.initGlobalEvent(game);
        return turmoil;
    }
    static getTurmoil(game) {
        if (game.turmoil === undefined) {
            throw new Error(`Assertion error: Turmoil not defined for ${game.id}`);
        }
        return game.turmoil;
    }
    static ifTurmoil(game, cb) {
        if (game.gameOptions.turmoilExtension !== false) {
            if (game.turmoil === undefined) {
                console.log(`Assertion failure: game.turmoil is undefined for ${game.id}`);
            }
            else {
                return cb(game.turmoil);
            }
        }
    }
    static ifTurmoilElse(game, cb, elseCb) {
        if (game.gameOptions.turmoilExtension !== false) {
            if (game.turmoil === undefined) {
                console.log(`Assertion failure: game.turmoil is undefined for ${game.id}`);
            }
            else {
                return cb(game.turmoil);
            }
        }
        return elseCb();
    }
    initGlobalEvent(game) {
        var _a, _b;
        this.comingGlobalEvent = this.globalEventDealer.draw();
        this.addNeutralDelegate((_a = this.comingGlobalEvent) === null || _a === void 0 ? void 0 : _a.revealedDelegate, game);
        this.distantGlobalEvent = this.globalEventDealer.draw();
        this.addNeutralDelegate((_b = this.distantGlobalEvent) === null || _b === void 0 ? void 0 : _b.revealedDelegate, game);
    }
    getPartyByName(name) {
        const party = this.parties.find((party) => party.name === name);
        if (party === undefined) {
            throw new Error(`Cannot find party with name {${name}}`);
        }
        return party;
    }
    sendDelegateToParty(playerId, partyName, game) {
        const party = this.getPartyByName(partyName);
        if (this.delegateReserve.has(playerId)) {
            this.delegateReserve.remove(playerId);
        }
        else {
            console.log(`${playerId}/${game.id} tried to get a delegate from an empty reserve.`);
            return;
        }
        party.sendDelegate(playerId, game);
        this.checkDominantParty();
    }
    removeDelegateFromParty(playerId, partyName, game) {
        const party = this.getPartyByName(partyName);
        this.delegateReserve.add(playerId);
        party.removeDelegate(playerId, game);
        this.checkDominantParty();
    }
    replaceDelegateFromParty(outgoingPlayerId, incomingPlayerId, partyName, game) {
        const party = this.getPartyByName(partyName);
        this.delegateReserve.add(outgoingPlayerId);
        party.removeDelegate(outgoingPlayerId, game);
        this.sendDelegateToParty(incomingPlayerId, partyName, game);
    }
    checkDominantParty() {
        const sortParties = [...this.parties].sort((p1, p2) => p2.delegates.size - p1.delegates.size);
        const max = sortParties[0].delegates.size;
        if (this.dominantParty.delegates.size !== max) {
            this.setNextPartyAsDominant(this.dominantParty);
        }
    }
    setNextPartyAsDominant(currentDominantParty) {
        const sortParties = [...this.parties].sort((p1, p2) => p2.delegates.size - p1.delegates.size);
        const max = sortParties[0].delegates.size;
        const currentIndex = this.parties.indexOf(currentDominantParty);
        let partiesToCheck = [];
        if (currentIndex === 0) {
            partiesToCheck = this.parties.slice(currentIndex + 1);
        }
        else if (currentIndex === this.parties.length - 1) {
            partiesToCheck = this.parties.slice(0, currentIndex);
        }
        else {
            const left = this.parties.slice(0, currentIndex);
            const right = this.parties.slice(currentIndex + 1);
            partiesToCheck = right.concat(left);
        }
        const partiesOrdered = partiesToCheck.reverse();
        partiesOrdered.some((newParty) => {
            if (newParty.delegates.size === max) {
                this.dominantParty = newParty;
                return true;
            }
            return false;
        });
    }
    endGeneration(game) {
        var _a, _b;
        game.getPlayers().forEach((player) => {
            player.decreaseTerraformRating();
        });
        if (this.currentGlobalEvent !== undefined) {
            const currentGlobalEvent = this.currentGlobalEvent;
            game.log('Resolving global event ${0}', (b) => b.globalEvent(currentGlobalEvent));
            currentGlobalEvent.resolve(game, this);
        }
        this.rulingParty = this.dominantParty;
        this.setRulingParty(game);
        this.setNextPartyAsDominant(this.rulingParty);
        this.usedFreeDelegateAction.clear();
        if (this.currentGlobalEvent) {
            this.globalEventDealer.discardedGlobalEvents.push(this.currentGlobalEvent);
        }
        this.currentGlobalEvent = this.comingGlobalEvent;
        this.addNeutralDelegate((_a = this.currentGlobalEvent) === null || _a === void 0 ? void 0 : _a.currentDelegate, game);
        this.comingGlobalEvent = this.distantGlobalEvent;
        this.distantGlobalEvent = this.globalEventDealer.draw();
        this.addNeutralDelegate((_b = this.distantGlobalEvent) === null || _b === void 0 ? void 0 : _b.revealedDelegate, game);
        game.log('Turmoil phase has been resolved');
    }
    addNeutralDelegate(partyName, game) {
        if (partyName) {
            this.sendDelegateToParty('NEUTRAL', partyName, game);
            game.log('A neutral delegate was added to the ${0} party', (b) => b.partyName(partyName));
        }
    }
    setRulingParty(game) {
        game.getPlayers().forEach((player) => player.hasTurmoilScienceTagBonus = false);
        const newChariman = this.rulingParty.partyLeader || 'NEUTRAL';
        if (this.rulingParty.partyLeader !== undefined) {
            this.rulingParty.delegates.remove(this.rulingParty.partyLeader);
        }
        this.rulingParty.delegates.forEachMultiplicity((count, playerId) => {
            this.delegateReserve.add(playerId, count);
        });
        this.rulingParty.partyLeader = undefined;
        this.rulingParty.delegates.clear();
        this.setNewChairman(newChariman, game, true);
    }
    setNewChairman(newChairman, game, setAgenda = true, gainTR = true) {
        if (this.chairman) {
            this.delegateReserve.add(this.chairman);
        }
        this.chairman = newChairman;
        if (setAgenda) {
            PoliticalAgendas_1.PoliticalAgendas.setNextAgenda(this, game);
        }
        if (this.chairman !== 'NEUTRAL') {
            const player = game.getPlayerById(this.chairman);
            let steps = gainTR ? 1 : 0;
            if (player.isCorporation(CardName_1.CardName.TEMPEST_CONSULTANCY))
                steps += 1;
            game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                if (steps > 0) {
                    player.increaseTerraformRatingSteps(steps);
                    game.log('${0} is the new chairman and gains ${1} TR', (b) => b.player(player).number(steps));
                }
                else {
                    game.log('${0} is the new chairman', (b) => b.player(player));
                }
                return undefined;
            }));
        }
        else {
            game.log('A neutral delegate is the new chairman.');
        }
    }
    chooseRulingParty(player) {
        const setRulingParty = new OrOptions_1.OrOptions();
        setRulingParty.title = 'Select new ruling party';
        setRulingParty.options = [...exports.ALL_PARTIES.map((p) => new SelectOption_1.SelectOption(p.partyName, 'Select', () => {
                this.rulingParty = this.getPartyByName(p.partyName);
                PoliticalAgendas_1.PoliticalAgendas.setNextAgenda(this, player.game);
                return undefined;
            }))];
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => setRulingParty));
    }
    onAgendaSelected(game) {
        const rulingParty = this.rulingParty;
        const bonusId = PoliticalAgendas_1.PoliticalAgendas.currentAgenda(this).bonusId;
        const bonus = rulingParty.bonuses.find((b) => b.id === bonusId);
        if (bonus === undefined) {
            throw new Error(`Bonus id ${bonusId} not found in party ${rulingParty.name}`);
        }
        game.log('The ruling bonus is: ${0}', (b) => b.string(bonus.description));
        bonus.grant(game);
        const policyId = PoliticalAgendas_1.PoliticalAgendas.currentAgenda(this).policyId;
        const policy = rulingParty.policies.find((p) => p.id === policyId);
        if (policy === undefined) {
            throw new Error(`Policy id ${policyId} not found in party ${rulingParty.name}`);
        }
        const description = typeof (policy.description) === 'string' ? policy.description : policy.description(undefined);
        game.log('The ruling policy is: ${0}', (b) => b.string(description));
        if (policy.apply !== undefined) {
            policy.apply(game);
        }
    }
    getPlayerInfluence(player) {
        let influence = 0;
        if (this.chairman !== undefined && this.chairman === player.id)
            influence++;
        const dominantParty = this.dominantParty;
        const isPartyLeader = dominantParty.partyLeader === player.id;
        const delegateCount = dominantParty.delegates.get(player.id);
        if (isPartyLeader) {
            influence++;
            if (delegateCount > 1)
                influence++;
        }
        else {
            if (delegateCount > 0)
                influence++;
        }
        if (this.playersInfluenceBonus.has(player.id)) {
            const bonus = this.playersInfluenceBonus.get(player.id);
            if (bonus) {
                influence += bonus;
            }
        }
        return influence;
    }
    addInfluenceBonus(player, bonus = 1) {
        if (this.playersInfluenceBonus.has(player.id)) {
            let current = this.playersInfluenceBonus.get(player.id);
            if (current) {
                current += bonus;
                this.playersInfluenceBonus.set(player.id, current);
            }
        }
        else {
            this.playersInfluenceBonus.set(player.id, bonus);
        }
    }
    canPlay(player, partyName) {
        if (this.rulingParty.name === partyName) {
            return true;
        }
        const party = this.getPartyByName(partyName);
        return party.delegates.count(player.id) >= 2;
    }
    getAvailableDelegateCount(playerId) {
        return this.delegateReserve.get(playerId);
    }
    getPresentPlayersInReserve() {
        return Array.from(new Set(this.delegateReserve));
    }
    hasDelegatesInReserve(playerId) {
        return this.getAvailableDelegateCount(playerId) > 0;
    }
    getPlayerVictoryPoints(player) {
        let victory = 0;
        if (this.chairman !== undefined && this.chairman === player.id)
            victory++;
        this.parties.forEach(function (party) {
            if (party.partyLeader === player.id) {
                victory++;
            }
        });
        return victory;
    }
    serialize() {
        var _a, _b;
        const result = {
            chairman: this.chairman,
            rulingParty: this.rulingParty.name,
            dominantParty: this.dominantParty.name,
            usedFreeDelegateAction: Array.from(this.usedFreeDelegateAction),
            delegateReserve: Array.from(this.delegateReserve.values()),
            parties: this.parties.map((p) => {
                return {
                    name: p.name,
                    delegates: Array.from(p.delegates.values()),
                    partyLeader: p.partyLeader,
                };
            }),
            playersInfluenceBonus: Array.from(this.playersInfluenceBonus.entries()),
            globalEventDealer: this.globalEventDealer.serialize(),
            distantGlobalEvent: (_a = this.distantGlobalEvent) === null || _a === void 0 ? void 0 : _a.name,
            comingGlobalEvent: (_b = this.comingGlobalEvent) === null || _b === void 0 ? void 0 : _b.name,
            politicalAgendasData: PoliticalAgendas_1.PoliticalAgendas.serialize(this.politicalAgendasData),
        };
        if (this.currentGlobalEvent !== undefined) {
            result.currentGlobalEvent = this.currentGlobalEvent.name;
        }
        return result;
    }
    static deserialize(d, playerIds) {
        const dealer = GlobalEventDealer_1.GlobalEventDealer.deserialize(d.globalEventDealer);
        const turmoil = new Turmoil(d.rulingParty, d.chairman || 'NEUTRAL', d.dominantParty, dealer);
        turmoil.usedFreeDelegateAction = new Set(d.usedFreeDelegateAction);
        turmoil.delegateReserve = mnemonist_1.MultiSet.from(d.delegateReserve);
        if (d.lobby !== undefined) {
            turmoil.usedFreeDelegateAction.clear();
            const legacyLobby = new Set(d.lobby);
            for (const player of playerIds) {
                if (legacyLobby.has(player.id)) {
                    turmoil.delegateReserve.add(player.id);
                }
                else {
                    turmoil.usedFreeDelegateAction.add(player.id);
                }
            }
        }
        turmoil.politicalAgendasData = PoliticalAgendas_1.PoliticalAgendas.deserialize(d.politicalAgendasData);
        d.parties.forEach((sp) => {
            const tp = turmoil.getPartyByName(sp.name);
            tp.delegates = mnemonist_1.MultiSet.from(sp.delegates);
            tp.partyLeader = sp.partyLeader;
        });
        turmoil.playersInfluenceBonus = new Map(d.playersInfluenceBonus);
        if (d.distantGlobalEvent) {
            turmoil.distantGlobalEvent = (0, GlobalEventDealer_1.getGlobalEventByName)(d.distantGlobalEvent);
        }
        if (d.comingGlobalEvent) {
            turmoil.comingGlobalEvent = (0, GlobalEventDealer_1.getGlobalEventByName)(d.comingGlobalEvent);
        }
        if (d.currentGlobalEvent) {
            turmoil.currentGlobalEvent = (0, GlobalEventDealer_1.getGlobalEventByName)(d.currentGlobalEvent);
        }
        return turmoil;
    }
}
exports.Turmoil = Turmoil;
