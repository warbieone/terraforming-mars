"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JunkVentures = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Size_1 = require("../../../common/cards/render/Size");
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardRenderer_1 = require("../render/CardRenderer");
const ChooseCards_1 = require("../../deferredActions/ChooseCards");
class JunkVentures extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
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
        const cards = player.game.projectDeck.drawN(player.game, 3);
        for (const card of cards) {
            player.game.projectDeck.discard(card);
        }
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
            if (card === undefined) {
                break;
            }
            cards.push(card);
        }
        player.game.defer(new ChooseCards_1.ChooseCards(player, cards, { keepMax: 1 }));
        return undefined;
    }
}
exports.JunkVentures = JunkVentures;
