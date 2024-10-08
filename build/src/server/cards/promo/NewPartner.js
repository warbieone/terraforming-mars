"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPartner = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const PreludesExpansion_1 = require("../../preludes/PreludesExpansion");
class NewPartner extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.NEW_PARTNER,
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'X42',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).prelude().asterix();
                }),
                description: 'Raise your M€ production 1 step. Immediately draw 2 prelude cards. Play 1 of them, and discard the other.',
            },
        });
    }
    bespokeCanPlay(player) {
        const game = player.game;
        if (!game.preludeDeck.canDraw(2)) {
            this.warnings.add('deckTooSmall');
        }
        return true;
    }
    bespokePlay(player) {
        const game = player.game;
        const cards = game.preludeDeck.drawN(game, 2);
        return PreludesExpansion_1.PreludesExpansion.selectPreludeToPlay(player, cards);
    }
}
exports.NewPartner = NewPartner;
