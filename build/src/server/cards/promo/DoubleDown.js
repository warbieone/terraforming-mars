"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleDown = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const PreludesExpansion_1 = require("../../preludes/PreludesExpansion");
const IPreludeCard_1 = require("../prelude/IPreludeCard");
class DoubleDown extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.DOUBLE_DOWN,
            metadata: {
                cardNumber: 'X40',
                description: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Copy your other prelude\'s direct effect.', Size_1.Size.SMALL, true);
                }),
            },
        });
    }
    cloneablePreludes(player) {
        const cards = player.playedCards.filter(IPreludeCard_1.isPreludeCard)
            .filter((card) => card.name !== this.name)
            .filter((card) => card.canPlay(player));
        if (player.lastCardPlayed === CardName_1.CardName.NEW_PARTNER) {
            const newPartner = player.preludeCardsInHand.filter((card) => card.name === CardName_1.CardName.NEW_PARTNER)[0];
            if (newPartner !== undefined) {
                cards.push(newPartner);
            }
        }
        return cards;
    }
    bespokeCanPlay(player) {
        return this.cloneablePreludes(player).length > 0;
    }
    bespokePlay(player) {
        const preludes = this.cloneablePreludes(player);
        if (preludes.length === 0) {
            PreludesExpansion_1.PreludesExpansion.fizzle(player, this);
            return undefined;
        }
        player.game.inDoubleDown = true;
        return PreludesExpansion_1.PreludesExpansion.selectPreludeToPlay(player, preludes, undefined, 'double-down');
    }
}
exports.DoubleDown = DoubleDown;
