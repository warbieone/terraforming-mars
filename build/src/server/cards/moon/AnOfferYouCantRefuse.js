"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnOfferYouCantRefuse = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Turmoil_1 = require("../../turmoil/Turmoil");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const Options_1 = require("../Options");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class AnOfferYouCantRefuse extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.AN_OFFER_YOU_CANT_REFUSE,
            type: CardType_1.CardType.EVENT,
            cost: 5,
            metadata: {
                description: 'Exchange a NON-NEUTRAL opponent delegate with one of your own from the reserve. This exchange may not change the party leader. You may then move your delegate to another party.',
                cardNumber: 'M62',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().delegates(1, { all: Options_1.all }).asterix().nbsp.plus().delegates(1);
                }),
            },
        });
    }
    isReplaceableDelegate(delegate, player, party) {
        if (delegate === player.id || delegate === 'NEUTRAL') {
            return false;
        }
        if (party.partyLeader === undefined) {
            return false;
        }
        if (party.partyLeader === player.id) {
            return true;
        }
        const partyLeaderDelegateCount = party.delegates.get(party.partyLeader);
        const yourDelegateCount = party.delegates.get(player.id);
        if (delegate !== party.partyLeader) {
            return yourDelegateCount < partyLeaderDelegateCount;
        }
        else {
            if (partyLeaderDelegateCount - yourDelegateCount <= 1) {
                return false;
            }
            for (const m of party.delegates.multiplicities()) {
                if (m[0] === party.partyLeader || m[0] === player.id) {
                    continue;
                }
                if (m[1] === partyLeaderDelegateCount) {
                    return false;
                }
            }
            return true;
        }
    }
    bespokeCanPlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        if (!turmoil.hasDelegatesInReserve(player.id)) {
            return false;
        }
        for (const party of turmoil.parties) {
            for (const delegate of party.delegates.keys()) {
                if (this.isReplaceableDelegate(delegate, player, party)) {
                    return true;
                }
            }
        }
        return false;
    }
    moveToAnotherParty(game, from, delegate) {
        const orOptions = new OrOptions_1.OrOptions();
        const turmoil = Turmoil_1.Turmoil.getTurmoil(game);
        turmoil.parties.forEach((party) => {
            if (party.name === from) {
                orOptions.options.push(new SelectOption_1.SelectOption('Do not move', '', () => {
                    return undefined;
                }));
            }
            else {
                orOptions.options.push(new SelectOption_1.SelectOption(party.name, 'Select', () => {
                    turmoil.removeDelegateFromParty(delegate, from, game);
                    turmoil.sendDelegateToParty(delegate, party.name, game);
                    return undefined;
                }));
            }
        });
        return orOptions;
    }
    bespokePlay(player) {
        const game = player.game;
        const turmoil = Turmoil_1.Turmoil.getTurmoil(game);
        const orOptions = new OrOptions_1.OrOptions();
        for (const party of turmoil.parties) {
            for (const delegate of party.delegates.keys()) {
                if (!this.isReplaceableDelegate(delegate, player, party)) {
                    continue;
                }
                const option = new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('${0} / ${1}', (b) => b.party(party).playerId(delegate)), 'Select', () => {
                    turmoil.replaceDelegateFromParty(delegate, player.id, party.name, game);
                    turmoil.checkDominantParty();
                    return this.moveToAnotherParty(game, party.name, player.id);
                });
                orOptions.options.push(option);
            }
        }
        return orOptions;
    }
}
exports.AnOfferYouCantRefuse = AnOfferYouCantRefuse;
