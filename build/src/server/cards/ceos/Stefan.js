"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stefan = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SelectCard_1 = require("../../inputs/SelectCard");
class Stefan extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.STEFAN,
            metadata: {
                cardNumber: 'L19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('SELL').cards(1).colon().megacredits(3);
                }),
                description: 'Once per game, sell any number of cards from your hand for 3 M€ each.',
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
        return new SelectCard_1.SelectCard('Sell patents', 'Sell', player.cardsInHand, (foundCards) => {
            player.megaCredits += foundCards.length * 3;
            foundCards.forEach((card) => {
                for (let i = 0; i < player.cardsInHand.length; i++) {
                    if (player.cardsInHand[i].name === card.name) {
                        player.cardsInHand.splice(i, 1);
                        break;
                    }
                }
                player.game.projectDeck.discard(card);
            });
            player.game.log('${0} sold ${1} patents', (b) => b.player(player).number(foundCards.length));
            return undefined;
        }, { min: 0, max: player.cardsInHand.length });
    }
}
exports.Stefan = Stefan;
