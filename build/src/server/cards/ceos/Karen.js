"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Karen = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const SelectCard_1 = require("../../inputs/SelectCard");
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
        const cardsDrawn = [];
        const game = player.game;
        for (let i = 0; i < game.generation; i++) {
            cardsDrawn.push(game.preludeDeck.draw(game));
        }
        cardsDrawn.forEach((card) => {
            var _a;
            if (((_a = card.canPlay) === null || _a === void 0 ? void 0 : _a.call(card, player)) === false) {
                cardsDrawn.splice(cardsDrawn.indexOf(card), 1);
                game.log('${0} was discarded as ${1} could not play it,', (b) => b.card(card).player(player), { reservedFor: player });
            }
        });
        if (cardsDrawn.length === 0) {
            game.log('${0} drew no playable prelude cards', (b) => b.player(player));
            return undefined;
        }
        return new SelectCard_1.SelectCard('Choose prelude card to play', 'Play', cardsDrawn, ([card]) => {
            if (card.canPlay === undefined || card.canPlay(player)) {
                return player.playCard(card);
            }
            else {
                throw new Error('You cannot play this card');
            }
        });
    }
}
exports.Karen = Karen;
