"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Karen = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const PreludesExpansion_1 = require("../../preludes/PreludesExpansion");
class Karen extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.KAREN,
            metadata: {
                cardNumber: 'L11',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('X').prelude().asterix();
                }),
                description: 'Once per game, draw Prelude cards equal to the current generation number and choose one to play, and discard the rest.',
            },
        });
    }
    action(player) {
        this.isDisabled = true;
        const game = player.game;
        const cards = [];
        for (let i = 0; i < game.generation; i++) {
            cards.push(game.preludeDeck.draw(game));
        }
        PreludesExpansion_1.PreludesExpansion.chooseAndPlayPrelude(player, cards);
        return undefined;
    }
}
exports.Karen = Karen;
//# sourceMappingURL=Karen.js.map