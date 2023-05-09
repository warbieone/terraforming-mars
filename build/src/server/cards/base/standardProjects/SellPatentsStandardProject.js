"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellPatentsStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const SelectCard_1 = require("../../../inputs/SelectCard");
const Options_1 = require("../../Options");
class SellPatentsStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.SELL_PATENTS_STANDARD_PROJECT,
            cost: 0,
            metadata: {
                cardNumber: 'SP8',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Discard any number of cards to gain that amount of M€.', (eb) => {
                    eb.text('X').cards(1).startAction.megacredits(0, { multiplier: Options_1.multiplier });
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
        return new SelectCard_1.SelectCard('Sell patents', 'Sell', player.cardsInHand, (cards) => {
            player.megaCredits += cards.length;
            cards.forEach((card) => {
                for (let i = 0; i < player.cardsInHand.length; i++) {
                    if (player.cardsInHand[i].name === card.name) {
                        player.cardsInHand.splice(i, 1);
                        break;
                    }
                }
                player.game.projectDeck.discard(card);
            });
            this.projectPlayed(player);
            player.game.log('${0} sold ${1} patents', (b) => b.player(player).number(cards.length));
            return undefined;
        }, { max: player.cardsInHand.length, played: false });
    }
}
exports.SellPatentsStandardProject = SellPatentsStandardProject;
