"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleDown = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const CardType_1 = require("../../../common/cards/CardType");
const SelectCard_1 = require("../../inputs/SelectCard");
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
        return player.playedCards.filter((card) => card.type === CardType_1.CardType.PRELUDE)
            .filter((card) => card.name !== this.name)
            .filter((card) => card.canPlay(player));
    }
    bespokeCanPlay(player) {
        return this.cloneablePreludes(player).length > 0;
    }
    bespokePlay(player) {
        const preludes = this.cloneablePreludes(player);
        if (preludes.length === 0) {
            return undefined;
        }
        return new SelectCard_1.SelectCard('Choose prelude card to play', undefined, preludes, ([card]) => {
            player.playCard(card, undefined, 'action-only');
            return undefined;
        });
    }
}
exports.DoubleDown = DoubleDown;
