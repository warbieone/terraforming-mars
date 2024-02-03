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
const mnemonist_1 = require("mnemonist");
const SendDelegateToArea_1 = require("../deferredActions/SendDelegateToArea");
const Policy_1 = require("./Policy");
exports.ALL_PARTIES = {
    [PartyName_1.PartyName.MARS]: MarsFirst_1.MarsFirst,
    [PartyName_1.PartyName.SCIENTISTS]: Scientists_1.Scientists,
    [PartyName_1.PartyName.UNITY]: Unity_1.Unity,
    [PartyName_1.PartyName.GREENS]: Greens_1.Greens,
    [PartyName_1.PartyName.REDS]: Reds_1.Reds,
    [PartyName_1.PartyName.KELVINISTS]: Kelvinists_1.Kelvinists,
};
function createParties() {
    return [new MarsFirst_1.MarsFirst(), new Scientists_1.Scientists(), new Unity_1.Unity(), new Greens_1.Greens(), new Reds_1.Reds(), new Kelvinists_1.Kelvinists()];
}
const UNINITIALIZED_POLITICAL_AGENDAS_DATA = {
    agendas: new Map(),
    agendaStyle: Types_1.AgendaStyle.CHAIRMAN,
};
class Turmoil {
    constructor(rulingPartyName, chairman, dominantPartyName, globalEventDealer) {
        this.chairman = undefined;
        this.usedFreeDelegateAction = new Set();
        this.delegateReserve = new mnemonist_1.MultiSet();
        this.parties = createParties();
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
        turmoil.parties = createParties();
        game.getPlayersInGenerationOrder().forEach((player) => {
            turmoil.delegateReserve.add(player, constants_1.DELEGATES_PER_PLAYER);
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
    rulingPolicy() {
        const rulingParty = this.rulingParty;
        const rulingPolicyId = PoliticalAgendas_1.PoliticalAgendas.currentAgenda(this).policyId;
        const policy = rulingParty.policies.find((policy) => policy.id === rulingPolicyId);
        if (policy === undefined) {
            throw new Error(`Policy ${rulingPolicyId} not found in ${rulingParty.name}`);
        }
        return policy;
    }
    sendDelegateToParty(playerId, partyName, game, throwIfError = false) {
        const party = this.getPartyByName(partyName);
        if (this.delegateReserve.has(playerId)) {
            this.delegateReserve.remove(playerId);
        }
        else {
            console.log(`${playerId}/${game.id} tried to get a delegate from an empty reserve.`);
            if (throwIfError) {
                throw new Error('No available delegate');
            }
            return;
        }
        party.sendDelegate(playerId, game);
        this.checkDominantParty();
    }
    removeDelegateFromParty(delegate, partyName, game) {
        const party = this.getPartyByName(partyName);
        this.delegateReserve.add(delegate);
        party.removeDelegate(delegate, game);
        this.checkDominantParty();
    }
    replaceDelegateFromParty(outgoingDelegate, incomingDelegate, partyName, game) {
        const party = this.getPartyByName(partyName);
        this.delegateReserve.add(outgoingDelegate);
        party.removeDelegate(outgoingDelegate, game);
        this.sendDelegateToParty(incomingDelegate, partyName, game);
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
        this.setRulingParty(game);
        this.setNextPartyAsDominant(this.rulingParty);
        this.usedFreeDelegateAction.clear();
        if (this.currentGlobalEvent) {
            this.globalEventDealer.discard(this.currentGlobalEvent);
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
        var _a, _b;
        (_b = (_a = this.rulingPolicy()).onPolicyEnd) === null || _b === void 0 ? void 0 : _b.call(_a, game);
        if (game.beholdTheEmperor !== true) {
            this.rulingParty = this.dominantParty;
        }
        let newChairman = this.rulingParty.partyLeader || 'NEUTRAL';
        if (game.beholdTheEmperor === true && this.chairman !== undefined) {
            newChairman = this.chairman;
        }
        if (game.beholdTheEmperor !== true) {
            if (this.rulingParty.partyLeader !== undefined) {
                this.rulingParty.delegates.remove(this.rulingParty.partyLeader);
            }
            this.rulingParty.delegates.forEachMultiplicity((count, playerId) => {
                this.delegateReserve.add(playerId, count);
            });
            this.rulingParty.partyLeader = undefined;
            this.rulingParty.delegates.clear();
        }
        this.setNewChairman(newChairman, game, true);
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
            const chairman = this.chairman;
            let steps = gainTR ? 1 : 0;
            if (chairman.isCorporation(CardName_1.CardName.TEMPEST_CONSULTANCY))
                steps += 1;
            chairman.defer(() => {
                if (steps > 0) {
                    chairman.increaseTerraformRating(steps);
                    game.log('${0} is the new chairman and gains ${1} TR', (b) => b.player(chairman).number(steps));
                }
                else {
                    game.log('${0} is the new chairman', (b) => b.player(chairman));
                }
            });
        }
        else {
            game.log('A neutral delegate is the new chairman.');
        }
    }
    onAgendaSelected(game) {
        var _a;
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
        const description = (0, Policy_1.policyDescription)(policy, undefined);
        game.log('The ruling policy is: ${0}', (b) => b.string(description));
        (_a = policy.onPolicyStart) === null || _a === void 0 ? void 0 : _a.call(policy, game);
    }
    getPlayerInfluence(player) {
        let influence = 0;
        if (this.chairman !== undefined && this.chairman === player)
            influence++;
        const dominantParty = this.dominantParty;
        const isPartyLeader = dominantParty.partyLeader === player;
        const delegateCount = dominantParty.delegates.get(player);
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
        player.tableau.forEach((card) => {
            var _a;
            const bonus = (_a = card.getInfluenceBonus) === null || _a === void 0 ? void 0 : _a.call(card, player);
            if (bonus !== undefined) {
                influence += bonus;
            }
        });
        return influence;
    }
    addInfluenceBonus(player, bonus = 1) {
        if (this.playersInfluenceBonus.has(player.id)) {
            let current = this.playersInfluenceBonus.get(player.id);
            if (current !== null && current !== undefined) {
                current += bonus;
                this.playersInfluenceBonus.set(player.id, current);
            }
        }
        else {
            this.playersInfluenceBonus.set(player.id, bonus);
        }
    }
    getAvailableDelegateCount(delegate) {
        return this.delegateReserve.get(delegate);
    }
    getPresentPlayersInReserve() {
        return Array.from(new Set(this.delegateReserve));
    }
    hasDelegatesInReserve(playerId) {
        return this.getAvailableDelegateCount(playerId) > 0;
    }
    getPlayerVictoryPoints(player) {
        let victory = 0;
        if (this.chairman === player)
            victory++;
        this.parties.forEach((party) => {
            if (party.partyLeader === player) {
                victory++;
            }
        });
        return victory;
    }
    getSendDelegateInput(player) {
        if (this.hasDelegatesInReserve(player)) {
            let sendDelegate;
            if (!this.usedFreeDelegateAction.has(player)) {
                sendDelegate = new SendDelegateToArea_1.SendDelegateToArea(player, 'Send a delegate in an area (from lobby)', { freeStandardAction: true });
            }
            else if (player.isCorporation(CardName_1.CardName.INCITE) && player.canAfford(3)) {
                sendDelegate = new SendDelegateToArea_1.SendDelegateToArea(player, 'Send a delegate in an area (3 M€)', { cost: 3 });
            }
            else if (player.canAfford(5)) {
                sendDelegate = new SendDelegateToArea_1.SendDelegateToArea(player, 'Send a delegate in an area (5 M€)', { cost: 5 });
            }
            if (sendDelegate) {
                return sendDelegate.execute();
            }
        }
        return undefined;
    }
    serialize() {
        var _a, _b;
        const result = {
            chairman: serializeDelegateOrUndefined(this.chairman),
            rulingParty: this.rulingParty.name,
            dominantParty: this.dominantParty.name,
            usedFreeDelegateAction: Array.from(this.usedFreeDelegateAction).map((p) => p.id),
            delegateReserve: Array.from(this.delegateReserve.values()).map(serializeDelegate),
            parties: this.parties.map((p) => {
                return {
                    name: p.name,
                    delegates: Array.from(p.delegates.values()).map(serializeDelegate),
                    partyLeader: serializeDelegateOrUndefined(p.partyLeader),
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
    static deserialize(d, players) {
        const dealer = GlobalEventDealer_1.GlobalEventDealer.deserialize(d.globalEventDealer);
        const chairman = deserializeDelegateOrUndefined(d.chairman, players);
        const turmoil = new Turmoil(d.rulingParty, chairman || 'NEUTRAL', d.dominantParty, dealer);
        turmoil.usedFreeDelegateAction = new Set(d.usedFreeDelegateAction.map((p) => deserializePlayerId(p, players)));
        turmoil.delegateReserve = mnemonist_1.MultiSet.from(d.delegateReserve.map((p) => deserializeDelegate(p, players)));
        if (d.lobby !== undefined) {
            turmoil.usedFreeDelegateAction.clear();
            const legacyLobby = new Set(d.lobby);
            for (const player of players) {
                if (legacyLobby.has(player.id)) {
                    turmoil.delegateReserve.add(player);
                }
                else {
                    turmoil.usedFreeDelegateAction.add(player);
                }
            }
        }
        turmoil.politicalAgendasData = PoliticalAgendas_1.PoliticalAgendas.deserialize(d.politicalAgendasData);
        d.parties.forEach((sp) => {
            const tp = turmoil.getPartyByName(sp.name);
            tp.delegates = mnemonist_1.MultiSet.from(sp.delegates.map((p) => deserializeDelegate(p, players)));
            tp.partyLeader = deserializeDelegateOrUndefined(sp.partyLeader, players);
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
function serializeDelegate(delegate) {
    return delegate === 'NEUTRAL' ? 'NEUTRAL' : delegate.id;
}
function serializeDelegateOrUndefined(delegate) {
    if (delegate === undefined) {
        return undefined;
    }
    return serializeDelegate(delegate);
}
function deserializePlayerId(playerId, players) {
    const player = players.find((p) => p.id === playerId);
    if (player === undefined) {
        throw new Error('Delegate not found');
    }
    return player;
}
function deserializeDelegate(serializedDelegate, players) {
    if (serializedDelegate === 'NEUTRAL') {
        return 'NEUTRAL';
    }
    return deserializePlayerId(serializedDelegate, players);
}
function deserializeDelegateOrUndefined(serializedDelegate, players) {
    if (serializedDelegate === undefined) {
        return undefined;
    }
    return deserializeDelegate(serializedDelegate, players);
}
//# sourceMappingURL=Turmoil.js.map