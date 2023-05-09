"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendDelegateToArea = void 0;
const SelectPartyToSendDelegate_1 = require("../inputs/SelectPartyToSendDelegate");
const DeferredAction_1 = require("./DeferredAction");
const SelectPaymentDeferred_1 = require("./SelectPaymentDeferred");
const Turmoil_1 = require("../turmoil/Turmoil");
class SendDelegateToArea extends DeferredAction_1.DeferredAction {
    constructor(player, title = 'Select where to send a delegate', options = {}) {
        super(player, DeferredAction_1.Priority.DEFAULT);
        this.title = title;
        this.options = options;
        this.turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
    }
    getAvailableParties() {
        let parties = this.turmoil.parties;
        if (this.options.replace) {
            parties = this.turmoil.parties.filter((party) => {
                if (party.delegates.size < 2)
                    return false;
                for (const delegate of party.delegates) {
                    if (delegate !== this.options.replace)
                        continue;
                    if (delegate !== party.partyLeader)
                        return true;
                    return party.delegates.get(this.options.replace) > 1;
                }
                return false;
            });
        }
        return parties.map((party) => party.name);
    }
    execute() {
        var _a;
        const availableParties = this.getAvailableParties();
        if (availableParties.length === 0) {
            return undefined;
        }
        const numDelegateToSend = (_a = this.options.count) !== null && _a !== void 0 ? _a : 1;
        const sendDelegate = new SelectPartyToSendDelegate_1.SelectPartyToSendDelegate(this.title, 'Send delegate', availableParties, (partyName) => {
            var _a;
            if (this.options.cost) {
                this.player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(this.player, this.options.cost, { title: 'Select how to pay for send delegate action' }));
            }
            for (let i = 0; i < numDelegateToSend; i++) {
                if (this.options.replace) {
                    this.turmoil.replaceDelegateFromParty(this.options.replace, this.player.id, partyName, this.player.game);
                }
                else {
                    this.turmoil.sendDelegateToParty(this.player.id, partyName, this.player.game);
                }
            }
            if (((_a = this.options) === null || _a === void 0 ? void 0 : _a.freeStandardAction) === true) {
                this.turmoil.usedFreeDelegateAction.add(this.player.id);
            }
            this.player.totalDelegatesPlaced += numDelegateToSend;
            this.player.game.log('${0} sent ${1} delegate(s) in ${2} area', (b) => b.player(this.player).number(numDelegateToSend).partyName(partyName));
            return undefined;
        });
        return sendDelegate;
    }
}
exports.SendDelegateToArea = SendDelegateToArea;
