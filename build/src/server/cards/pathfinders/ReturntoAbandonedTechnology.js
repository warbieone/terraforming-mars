"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturntoAbandonedTechnology = void 0;
const Card_1 = require("../Card");
const DrawCards_1 = require("../../deferredActions/DrawCards");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
class ReturntoAbandonedTechnology extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.RETURN_TO_ABANDONED_TECHNOLOGY,
            cost: 4,
            tags: [Tag_1.Tag.MARS],
            metadata: {
                cardNumber: 'Pf22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Draw the top 4 cards from the discard pile. Choose 2 to keep and discard the rest.', Size_1.Size.SMALL).br;
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        return player.game.projectDeck.discardPile.length > 0;
    }
    bespokePlay(player) {
        const cards = [];
        for (let idx = 0; idx < 4; idx++) {
            const card = player.game.projectDeck.discardPile.pop();
            if (card === undefined)
                break;
            cards.push(card);
        }
        const cardsToKeep = Math.min(2, cards.length);
        return DrawCards_1.DrawCards.choose(player, cards, { keepMax: cardsToKeep });
    }
}
exports.ReturntoAbandonedTechnology = ReturntoAbandonedTechnology;
