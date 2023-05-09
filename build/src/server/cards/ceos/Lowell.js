"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lowell = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
class Lowell extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.LOWELL,
            tags: [Tag_1.Tag.WILD],
            metadata: {
                cardNumber: 'L12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().megacredits(8).colon().text('CHANGE LEADER').asterix();
                    b.br.br;
                }),
                description: 'Once per game, pay 8 M€ to draw 3 CEO cards and choose one to play. Discard this card.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.canAfford(8);
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        let ceosDrawn = [
            game.ceoDeck.draw(game),
            game.ceoDeck.draw(game),
            game.ceoDeck.draw(game),
        ];
        ceosDrawn = ceosDrawn.filter((ceo) => {
            var _a;
            if (((_a = ceo.canPlay) === null || _a === void 0 ? void 0 : _a.call(ceo, player)) === false) {
                game.ceoDeck.discard(ceo);
                game.log('${0} was discarded as ${1} could not play it,', (b) => b.card(ceo).player(player), { reservedFor: player });
                return false;
            }
            return true;
        });
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 8, { title: 'Select how to pay for action' }));
        return new SelectCard_1.SelectCard('Choose CEO card to play', 'Play', ceosDrawn, (([chosenCeo]) => {
            ceosDrawn.filter((c) => c !== chosenCeo).forEach((c) => game.ceoDeck.discard(c));
            const lowellIndex = player.playedCards.findIndex((c) => c.name === this.name);
            player.playedCards.splice(lowellIndex, 1);
            game.ceoDeck.discard(this);
            return player.playCard(chosenCeo);
        }));
    }
}
exports.Lowell = Lowell;
