"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ender = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const DiscardCards_1 = require("../../deferredActions/DiscardCards");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const SelectAmount_1 = require("../../inputs/SelectAmount");
class Ender extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.ENDER,
            metadata: {
                cardNumber: 'L05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().minus().text('2X').cards(1).plus().text('2X').cards(1);
                }),
                description: 'Once per game, discard any number of cards up to twice the current generation number to draw that many cards.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.cardsInHand.length > 0;
    }
    action(player) {
        this.isDisabled = true;
        const max = Math.min(player.cardsInHand.length, player.game.generation * 2);
        return new SelectAmount_1.SelectAmount('Select number of cards to discard', 'Discard cards', (amount) => {
            player.game.defer(new DiscardCards_1.DiscardCards(player, amount), DeferredAction_1.Priority.DISCARD_AND_DRAW);
            player.game.defer(DrawCards_1.DrawCards.keepAll(player, amount));
            return undefined;
        }, 1, max);
    }
}
exports.Ender = Ender;
