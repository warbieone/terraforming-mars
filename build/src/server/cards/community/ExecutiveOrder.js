"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveOrder = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Turmoil_1 = require("../../turmoil/Turmoil");
const SelectGlobalEvent_1 = require("../../inputs/SelectGlobalEvent");
class ExecutiveOrder extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.EXECUTIVE_ORDER,
            metadata: {
                cardNumber: 'Y31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('PLAY').globalEvent().asterix();
                    b.br.br.br;
                    b.delegates(2).megacredits(10).br.br;
                }),
                description: 'Draw 4 global events. Play 1 as the CURRENT GLOBAL EVENT and discard the rest. Place 2 delegates in any party. Gain 10 M€.',
            },
        });
    }
    bespokePlay(player) {
        player.stock.add(Resource_1.Resource.MEGACREDITS, 10, { log: true });
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        const globalEvents = [];
        for (let i = 0; i < 4; i++) {
            const event = turmoil.globalEventDealer.draw();
            if (event !== undefined) {
                globalEvents.push(event);
            }
        }
        return new SelectGlobalEvent_1.SelectGlobalEvent(globalEvents)
            .andThen((event) => {
            player.game.log('${0} selected Global Event ${1} for the current gflobal event', (b) => b.player(player).globalEvent(event));
            turmoil.currentGlobalEvent = event;
            turmoil.sendDelegateToParty('NEUTRAL', event.currentDelegate, player.game);
            player.game.log('Neutral delegate added to ${0}', (b) => b.partyName(event.currentDelegate));
            globalEvents.forEach((ge) => {
                if (ge.name !== event.name) {
                    turmoil.globalEventDealer.discard(ge);
                }
            });
            player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, 'Select where to send 2 delegates', { count: 2 }));
            return undefined;
        });
    }
}
exports.ExecutiveOrder = ExecutiveOrder;
//# sourceMappingURL=ExecutiveOrder.js.map