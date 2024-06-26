"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lowell = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
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
        if (!player.game.ceoDeck.canDraw(3)) {
            this.warnings.add('deckTooSmall');
        }
        if (!super.canAct(player)) {
            return false;
        }
        return player.canAfford(8);
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        let ceosDrawn = game.ceoDeck.drawN(game, 3);
        ceosDrawn = ceosDrawn.filter((ceo) => {
            if (ceo.canPlay?.(player) === false) {
                game.ceoDeck.discard(ceo);
                game.log('${0} was discarded as ${1} could not play it.', (b) => b.card(ceo).player(player), { reservedFor: player });
                return false;
            }
            return true;
        });
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 8, { title: titles_1.TITLES.payForCardAction(this.name) }));
        return new SelectCard_1.SelectCard('Choose CEO card to play', 'Play', ceosDrawn)
            .andThen(([chosenCeo]) => {
            ceosDrawn.filter((c) => c !== chosenCeo).forEach((c) => game.ceoDeck.discard(c));
            const lowellIndex = player.playedCards.findIndex((c) => c.name === this.name);
            player.playedCards.splice(lowellIndex, 1);
            game.ceoDeck.discard(this);
            player.playCard(chosenCeo);
            return undefined;
        });
    }
}
exports.Lowell = Lowell;
