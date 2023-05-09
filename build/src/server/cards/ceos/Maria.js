"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maria = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SelectColony_1 = require("../../inputs/SelectColony");
const ColoniesHandler_1 = require("../../colonies/ColoniesHandler");
class Maria extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.MARIA,
            metadata: {
                cardNumber: 'L13',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('X ').placeColony().colonies(1);
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
        this.isDisabled = true;
        const game = player.game;
        if (game.discardedColonies.length === 0)
            return undefined;
        const count = Math.min(game.discardedColonies.length, player.game.generation);
        const availableColonies = game.discardedColonies.slice(0, count);
        const selectColony = new SelectColony_1.SelectColony('Select colony tile to add', 'Add colony tile', availableColonies, (colony) => {
            if (availableColonies.includes(colony)) {
                game.colonies.push(colony);
                game.colonies.sort((a, b) => (a.name > b.name) ? 1 : -1);
                game.log('${0} added a new Colony tile: ${1}', (b) => b.player(player).colony(colony));
                this.checkActivation(colony, game);
                if (colony.isActive) {
                    colony.addColony(player);
                }
            }
            else {
                throw new Error(`Colony ${colony.name} is not a discarded colony`);
            }
            return undefined;
        });
        selectColony.showTileOnly = true;
        return selectColony;
    }
    checkActivation(colony, game) {
        if (colony.isActive)
            return;
        for (const player of game.getPlayers()) {
            for (const card of player.tableau) {
                const active = ColoniesHandler_1.ColoniesHandler.maybeActivateColony(colony, card);
                if (active) {
                    return;
                }
            }
        }
    }
}
exports.Maria = Maria;
