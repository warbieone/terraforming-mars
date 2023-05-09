"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewPartner = void 0;
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const SelectCard_1 = require("../../inputs/SelectCard");
class NewPartner extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.NEW_PARTNER,
            behavior: {
                production: { megacredits: 1 },
            },
            metadata: {
                cardNumber: 'P43',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).prelude().asterix();
                }),
                description: 'Raise your M€ production 1 step. Immediately draw 2 prelude cards. Play 1 of them, and discard the other.',
            },
        });
    }
    bespokePlay(player) {
        const cardsDrawn = [
            player.game.preludeDeck.draw(player.game),
            player.game.preludeDeck.draw(player.game),
        ];
        player.game.log('You drew ${0} and ${1}', (b) => b.card(cardsDrawn[0]).card(cardsDrawn[1]), { reservedFor: player });
        const playableCards = cardsDrawn.filter((card) => card.canPlay(player) === true);
        if (playableCards.length === 0) {
            player.game.log('${0} and ${1} were discarded as ${2} could not pay for both cards.', (b) => b.card(cardsDrawn[0]).card(cardsDrawn[1]).player(player));
            return undefined;
        }
        return new SelectCard_1.SelectCard('Choose prelude card to play', 'Play', playableCards, ([card]) => {
            if (card.canPlay === undefined || card.canPlay(player)) {
                return player.playCard(card);
            }
            else {
                throw new Error('You cannot pay for this card');
            }
        });
    }
}
exports.NewPartner = NewPartner;
