"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recruitment = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const CardRenderer_1 = require("../render/CardRenderer");
const Turmoil_1 = require("../../turmoil/Turmoil");
const Options_1 = require("../Options");
class Recruitment extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.RECRUITMENT,
            cost: 2,
            type: CardType_1.CardType.EVENT,
            metadata: {
                cardNumber: 'T11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().delegates(1, { all: Options_1.all }).asterix().nbsp.plus().delegates(1);
                }),
                description: 'Exchange one NEUTRAL NON-LEADER delegate with one of your own from the reserve.',
            },
        });
    }
    bespokeCanPlay(player) {
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        if (turmoil.hasDelegatesInReserve(player.id) === false) {
            return false;
        }
        return turmoil.parties.some((party) => {
            const neutralDelegates = party.delegates.count('NEUTRAL');
            return neutralDelegates > 1 || (neutralDelegates === 1 && party.partyLeader !== 'NEUTRAL');
        });
    }
    bespokePlay(player) {
        player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, 'Select which Neutral delegate to remove', { replace: 'NEUTRAL' }));
        return undefined;
    }
}
exports.Recruitment = Recruitment;
