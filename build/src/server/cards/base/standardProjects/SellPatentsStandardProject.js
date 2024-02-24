"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellPatentsStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const SelectCard_1 = require("../../../inputs/SelectCard");
class SellPatentsStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.SELL_PATENTS_STANDARD_PROJECT,
            cost: 0,
            metadata: {
                cardNumber: 'SP8',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Discard any number of cards to gain that amount of M€.', (eb) => {
                    eb.text('X').cards(1).startAction.megacredits(1, { text: 'x' });
                })),
            },
        });
    }
    canAct(player) {
        return player.cardsInHand.length > 0;
    }
    actionEssence() {
    }
    action(player) {
        return new SelectCard_1.SelectCard('Sell patents', 'Sell', player.cardsInHand, { max: player.cardsInHand.length, played: false })
            .andThen((cards) => {
            player.megaCredits += cards.length;
            cards.forEach((card) => player.discardCardFromHand(card));
            this.projectPlayed(player);
            player.game.log('${0} sold ${1} patents', (b) => b.player(player).number(cards.length));
            return undefined;
        });
    }
}
exports.SellPatentsStandardProject = SellPatentsStandardProject;
