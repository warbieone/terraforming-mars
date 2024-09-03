"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoLeadership = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const PreludeCard_1 = require("../prelude/PreludeCard");
const Size_1 = require("../../../common/cards/render/Size");
const DrawCeoCardFromDeck_1 = require("../../deferredActions/DrawCeoCardFromDeck");
const Phase_1 = require("../../../common/Phase");
class CoLeadership extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.CO_LEADERSHIP,
            metadata: {
                cardNumber: 'xxx',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Draw 3 CEO cards and take one to your hand, it will be played on your first turn. Discard the other 2.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    bespokeCanPlay(player) {
        if (!player.game.ceoDeck.canDraw(3)) {
            this.warnings.add('deckTooSmall');
        }
        return true;
    }
    bespokePlay(player) {
        const game = player.game;
        game.defer(new DrawCeoCardFromDeck_1.DrawCeoCardFromDeck(player, 3)).andThen((card) => {
            if (card !== undefined) {
                if (game.phase === Phase_1.Phase.ACTION) {
                    if (player.canPlay(card)) {
                        player.playCard(card);
                    }
                    else {
                        game.log('Discarding ${0} because it is not playable', (b) => b.card(card));
                        game.ceoDeck.discard(card);
                    }
                }
                else {
                    player.ceoCardsInHand.push(card);
                }
            }
        });
        return undefined;
    }
}
exports.CoLeadership = CoLeadership;
