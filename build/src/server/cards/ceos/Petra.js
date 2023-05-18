"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Petra = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const constants_1 = require("../../../common/constants");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const SelectPartyToSendDelegate_1 = require("../../inputs/SelectPartyToSendDelegate");
const Resource_1 = require("../../../common/Resource");
const Size_1 = require("../../../common/cards/render/Size");
class Petra extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.PETRA,
            metadata: {
                cardNumber: 'L16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br;
                    b.text('REPLACE ALL NEUTRAL', Size_1.Size.TINY).delegates(1).colon().megacredits(3).asterix();
                    b.br.br;
                    b.plus().delegates(3).asterix;
                }),
                description: 'Once per game, replace all Neutral delegates with your delegates. Gain 3 M€ for each delegate replaced this way. Place 3 Neutral delegates.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        const turmoil = player.game.turmoil;
        if (turmoil === undefined || this.isDisabled === true)
            return false;
        const numNeutralDelegates = constants_1.DELEGATES_FOR_NEUTRAL_PLAYER - turmoil.getAvailableDelegateCount('NEUTRAL');
        const playerTotalDelegateCount = turmoil.getAvailableDelegateCount(player.id);
        return playerTotalDelegateCount >= numNeutralDelegates;
    }
    action(player) {
        this.isDisabled = true;
        const turmoil = player.game.turmoil;
        let count = 0;
        for (const party of turmoil.parties) {
            const neutralDelegates = party.delegates.count('NEUTRAL');
            for (let i = 0; i < neutralDelegates; i++) {
                turmoil.sendDelegateToParty(player.id, party.name, player.game);
                turmoil.removeDelegateFromParty('NEUTRAL', party.name, player.game);
                turmoil.checkDominantParty();
            }
            count += neutralDelegates;
        }
        if (turmoil.chairman === 'NEUTRAL') {
            turmoil.setNewChairman(player.id, player.game, false);
            turmoil.delegateReserve.remove(player.id);
            count += 1;
        }
        player.totalDelegatesPlaced += count;
        player.addResource(Resource_1.Resource.MEGACREDITS, count * 3, { log: true });
        const availableParties = turmoil.parties.map((party) => party.name);
        const title = 'Select where to send a Neutral delegate';
        const previousDominantParty = turmoil.dominantParty.name;
        for (let i = 0; i < 3; i++) {
            player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                return new SelectPartyToSendDelegate_1.SelectPartyToSendDelegate(title, 'Send delegate', availableParties, (partyName) => {
                    turmoil.sendDelegateToParty('NEUTRAL', partyName, player.game);
                    player.game.log('${0} sent ${1} Neutral delegate in ${2} area', (b) => b.player(player).number(1).party(turmoil.getPartyByName(partyName)));
                    return undefined;
                });
            }));
        }
        if (turmoil.dominantParty.name !== previousDominantParty) {
            player.game.log('${0} is the new dominant party', (b) => b.string(turmoil.dominantParty.name));
        }
        return undefined;
    }
}
exports.Petra = Petra;
//# sourceMappingURL=Petra.js.map