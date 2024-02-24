"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maria = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
class Maria extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.MARIA,
            metadata: {
                cardNumber: 'L13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('X ').colonyTile().colonies(1);
                }),
                description: 'Once per game, draw colony tiles equal to the current generation number. Put one into play and build a colony on it for free if possible.',
            },
        });
    }
    canAct(player) {
        const game = player.game;
        if (game.discardedColonies === undefined || !game.gameOptions.coloniesExtension)
            return false;
        return game.discardedColonies.length > 0 && this.isDisabled === false;
    }
    action(player) {
        const game = player.game;
        const count = Math.min(game.discardedColonies.length, player.game.generation);
        const availableColonies = game.discardedColonies.slice(0, count);
        this.isDisabled = true;
        ColoniesHandler_1.ColoniesHandler.addColonyTile(player, {
            colonies: availableColonies, cb: (colony) => {
                if (colony.isActive) {
                    colony.addColony(player);
                }
            }
        });
        return undefined;
    }
}
exports.Maria = Maria;
