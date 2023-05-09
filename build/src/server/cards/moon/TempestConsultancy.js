"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TempestConsultancy = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SendDelegateToArea_1 = require("../../deferredActions/SendDelegateToArea");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Tag_1 = require("../../../common/cards/Tag");
const Turmoil_1 = require("../../turmoil/Turmoil");
class TempestConsultancy extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.TEMPEST_CONSULTANCY,
            tags: [Tag_1.Tag.MOON],
            startingMegaCredits: 37,
            firstAction: {
                text: 'Place 2 delegates in one party',
                turmoil: { sendDelegates: { count: 2 } },
            },
            metadata: {
                description: 'You start with 37 M€. As your first action, place 2 delegates in one party.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(37).delegates(1).delegates(1).br;
                    b.action('Place 1 delegate in any party for every 5 Moon tags you have [max 3.]', (eb) => {
                        eb.empty().startAction.delegates(1).text('(max 3)', Size_1.Size.SMALL).slash().text('5 ').moon();
                    }).br;
                    b.effect('When your delegate becomes the chairman, increase your TR 1 step.', (eb) => {
                        eb.chairman().startEffect.tr(1);
                    });
                }),
            },
        });
    }
    initialAction(player) {
        const title = 'Tempest Consultancy first action - Select where to send two delegates';
        player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, title, { count: 2 }));
        return undefined;
    }
    canAct(player) {
        return player.tags.count(Tag_1.Tag.MOON) >= 5 && Turmoil_1.Turmoil.getTurmoil(player.game).getAvailableDelegateCount(player.id) > 0;
    }
    action(player) {
        let count = Math.floor(player.tags.count(Tag_1.Tag.MOON) / 5);
        count = Math.min(count, 3);
        count = Math.min(count, Turmoil_1.Turmoil.getTurmoil(player.game).getAvailableDelegateCount(player.id));
        if (count > 0) {
            player.game.defer(new SendDelegateToArea_1.SendDelegateToArea(player, `Select a party to send ${count} delegate(s) to`, { count: count }));
        }
        return undefined;
    }
}
exports.TempestConsultancy = TempestConsultancy;
