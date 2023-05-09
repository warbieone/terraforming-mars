"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveOrder = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Turmoil_1 = require("../../turmoil/Turmoil");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
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
        player.addResource(Resource_1.Resource.MEGACREDITS, 10, { log: true });
        const turmoil = Turmoil_1.Turmoil.getTurmoil(player.game);
        const globalEvents = [];
        for (let i = 0; i < 4; i++) {
            const event = turmoil.globalEventDealer.draw();
            if (event !== undefined) {
                globalEvents.push(event);
            }
        }
        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
            return new OrOptions_1.OrOptions(...globalEvents.map((event) => {
                const description = event.name + ': ' + event.description + ' Neutral delegate added: ' + event.currentDelegate;
                return new SelectOption_1.SelectOption(description, 'Select', () => {
                    turmoil.currentGlobalEvent = event;
                    turmoil.sendDelegateToParty('NEUTRAL', event.currentDelegate, player.game);
                    globalEvents.forEach((ge) => {
                        if (ge.name !== event.name) {
                            turmoil.globalEventDealer.discardedGlobalEvents.push(ge);
                        }
                    });
                    return undefined;
                });
            }));
        }));
        player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, 'Select where to send 2 delegates', { count: 2 }));
        return undefined;
    }
}
exports.ExecutiveOrder = ExecutiveOrder;
