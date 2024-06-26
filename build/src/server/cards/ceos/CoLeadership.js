"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoLeadership = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const PreludeCard_1 = require("../prelude/PreludeCard");
const Size_1 = require("../../../common/cards/render/Size");
const SelectCard_1 = require("../../inputs/SelectCard");
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
        let ceosDrawn = game.ceoDeck.drawN(game, 3);
        ceosDrawn = ceosDrawn.filter((ceo) => {
            if (ceo.canPlay?.(player) === false) {
                game.ceoDeck.discard(ceo);
                game.log('${0} was discarded as ${1} could not play it.', (b) => b.card(ceo).player(player), { reservedFor: player });
                return false;
            }
            return true;
        });
        if (ceosDrawn.length === 0) {
            game.log('${0} drew no playable CEO cards', (b) => b.player(player));
            return undefined;
        }
        return new SelectCard_1.SelectCard('Choose CEO card', 'Take', ceosDrawn)
            .andThen(([chosenCeo]) => {
            ceosDrawn.filter((c) => c !== chosenCeo).forEach((c) => game.ceoDeck.discard(c));
            player.ceoCardsInHand.push(chosenCeo);
            return undefined;
        });
    }
}
exports.CoLeadership = CoLeadership;
