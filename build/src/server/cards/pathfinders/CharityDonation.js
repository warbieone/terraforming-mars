"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectCharityDonationCard = exports.CharityDonation = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const LogHelper_1 = require("../../LogHelper");
const SelectCard_1 = require("../../inputs/SelectCard");
const DeferredAction_1 = require("../..//deferredActions/DeferredAction");
class CharityDonation extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CHARITY_DONATION,
            tags: [Tag_1.Tag.MARS],
            cost: 7,
            victoryPoints: 1,
            metadata: {
                cardNumber: 'Pf58',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.text('Reveal cards from the deck equal to the player count plus 1.')
                    .br
                    .text('In player order starting with you, each player takes one card in hand. Discard the remaining card.')),
            },
        });
    }
    bespokePlay(player) {
        const game = player.game;
        const players = game.getPlayersInGenerationOrder();
        const thisIdx = players.findIndex((p) => p === player);
        const cards = game.projectDeck.drawByCondition(game, players.length + 1, () => true);
        LogHelper_1.LogHelper.logDrawnCards(player, cards);
        game.defer(new SelectCharityDonationCard(players, thisIdx, thisIdx, cards));
        return undefined;
    }
}
exports.CharityDonation = CharityDonation;
class SelectCharityDonationCard extends DeferredAction_1.DeferredAction {
    constructor(players, playerIdx, boundaryIndex, cards) {
        super(players[playerIdx], DeferredAction_1.Priority.DRAW_CARDS);
        this.players = players;
        this.playerIdx = playerIdx;
        this.boundaryIndex = boundaryIndex;
        this.cards = cards;
    }
    execute() {
        return new SelectCard_1.SelectCard('Select a card to keep', 'Choose', this.cards, ([card]) => {
            const game = this.player.game;
            const cardIdx = this.cards.indexOf(card);
            if (cardIdx > -1) {
                this.cards.splice(cardIdx, 1);
            }
            this.player.cardsInHand.push(card);
            game.log('${0} drew ${1}', (b) => b.player(this.player).card(card));
            const nextIndex = (this.playerIdx + 1) % this.players.length;
            if (nextIndex !== this.boundaryIndex) {
                game.defer(new SelectCharityDonationCard(this.players, nextIndex, this.boundaryIndex, this.cards));
            }
            else {
                game.projectDeck.discard(this.cards[0]);
                game.log('${0} was discarded.', (b) => b.card(this.cards[0]));
            }
            return undefined;
        });
    }
}
exports.SelectCharityDonationCard = SelectCharityDonationCard;
