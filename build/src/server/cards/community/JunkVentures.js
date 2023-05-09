"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JunkVentures = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const LogHelper_1 = require("../../LogHelper");
class JunkVentures extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.JUNK_VENTURES,
            initialActionText: 'Discard the top 3 cards of the deck',
            startingMegaCredits: 43,
            metadata: {
                cardNumber: 'R49',
                description: 'You start with 43 M€. As your first action, discard the top 3 cards of the deck.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(43).text('DECK: ').minus().cards(3);
                    b.corpBox('action', (cb) => {
                        cb.text('ACTION: SHUFFLE THE DISCARD PILE, THEN DRAW 3 CARDS FROM IT. KEEP 1 AND DISCARD THE OTHER 2.', Size_1.Size.SMALL, true);
                    });
                }),
            },
        });
    }
    initialAction(player) {
        const discardedCards = new Set();
        for (let i = 0; i < 3; i++) {
            const card = player.game.projectDeck.draw(player.game);
            player.game.projectDeck.discard(card);
            discardedCards.add(card.name);
        }
        LogHelper_1.LogHelper.logDiscardedCards(player.game, Array.from(discardedCards));
        return undefined;
    }
    canAct(player) {
        return player.game.projectDeck.discardPile.length >= 3;
    }
    action(player) {
        const game = player.game;
        game.projectDeck.shuffleDiscardPile();
        const cards = [];
        for (let idx = 0; idx < 3; idx++) {
            const card = player.game.projectDeck.discardPile.pop();
            if (card === undefined)
                break;
            cards.push(card);
        }
        return DrawCards_1.DrawCards.choose(player, cards, { keepMax: 1 });
    }
}
exports.JunkVentures = JunkVentures;
