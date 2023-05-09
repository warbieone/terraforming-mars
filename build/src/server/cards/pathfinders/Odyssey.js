"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Odyssey = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Size_1 = require("../../../common/cards/render/Size");
const SelectProjectCardToPlay_1 = require("../../inputs/SelectProjectCardToPlay");
class Odyssey extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.ODYSSEY,
            startingMegaCredits: 33,
            metadata: {
                cardNumber: 'PfC18',
                description: 'You start with 33 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br.br.br.br.megacredits(33).nbsp.nbsp.nbsp;
                    b.colon().cards(1, { secondaryTag: Tag_1.Tag.EVENT }).asterix().br;
                    b.text('(Effect: Your event cards stay face up, and their tags are in use as if those were automated (green) cards.)', Size_1.Size.TINY, false, false).br;
                    b.action('Pay for and play an event card you have already played that has a base cost of 16M€ or less (INCLUDING events that place special tiles,) after which discard that card.', (e) => {
                        e.empty().startAction.event({ played: Options_1.played }).asterix().nbsp.text('≤').nbsp.megacredits(16);
                    });
                }),
            },
        });
        this.checkLoops = 0;
    }
    getCheckLoops() {
        return this.checkLoops;
    }
    availableEventCards(player) {
        this.checkLoops++;
        try {
            return player.playedCards.filter((card) => {
                return card.type === CardType_1.CardType.EVENT &&
                    card.cost <= 16 &&
                    player.canPlay(card);
            });
        }
        finally {
            this.checkLoops--;
        }
    }
    canAct(player) {
        return this.availableEventCards(player).length > 0;
    }
    action(player) {
        const eventCards = this.availableEventCards(player);
        return new SelectProjectCardToPlay_1.SelectProjectCardToPlay(player, eventCards, {
            action: 'discard',
            cb: (card) => player.removedFromPlayCards.push(card),
        });
    }
}
exports.Odyssey = Odyssey;
