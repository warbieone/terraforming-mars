"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playwrights = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const DeferredAction_1 = require("../../deferredActions/DeferredAction");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const MoonExpansion_1 = require("../../moon/MoonExpansion");
const Options_1 = require("../Options");
const SpecialDesignProxy_1 = require("./SpecialDesignProxy");
class Playwrights extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.PLAYWRIGHTS,
            tags: [Tag_1.Tag.POWER],
            startingMegaCredits: 38,
            type: CardType_1.CardType.CORPORATION,
            behavior: {
                production: { energy: 1 },
            },
            metadata: {
                cardNumber: 'R40',
                description: 'You start with 38 M€ and 1 energy production.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(38).production((pb) => pb.energy(1));
                    b.corpBox('action', (cb) => {
                        cb.action('Replay a played event from any player (INCLUDING events that place special tiles) by paying its cost ONLY in M€ (discounts and rebates apply), then REMOVE IT FROM PLAY.', (eb) => {
                            eb.megacredits(0, { questionMark: true }).startAction;
                            eb.text('replay', Size_1.Size.SMALL, true);
                            eb.nbsp.cards(1, { all: Options_1.all, secondaryTag: Tag_1.Tag.EVENT });
                        });
                    });
                }),
            },
        });
        this.checkLoops = 0;
    }
    canAct(player) {
        const replayableEvents = this.getReplayableEvents(player);
        return replayableEvents.length > 0;
    }
    action(player) {
        const players = player.game.getPlayers();
        const replayableEvents = this.getReplayableEvents(player);
        return new SelectCard_1.SelectCard('Select event card to replay at cost in M€ and remove from play', 'Select', replayableEvents, ([card]) => {
            const selectedCard = card;
            players.forEach((p) => {
                const cardIndex = p.playedCards.findIndex((c) => c.name === selectedCard.name);
                if (cardIndex !== -1) {
                    p.playedCards.splice(cardIndex, 1);
                }
            });
            const cost = player.getCardCost(selectedCard);
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, cost, {
                title: 'Select how to pay to replay the event',
                afterPay: () => {
                    player.playCard(selectedCard, undefined, 'nothing');
                    player.removedFromPlayCards.push(selectedCard);
                    if (selectedCard.name === CardName_1.CardName.SPECIAL_DESIGN) {
                        player.playedCards.push(new SpecialDesignProxy_1.SpecialDesignProxy());
                    }
                    else if (selectedCard.name === CardName_1.CardName.LAW_SUIT) {
                        player.game.defer(new DeferredAction_1.SimpleDeferredAction(player, () => {
                            player.game.getPlayers().some((p) => {
                                const card = p.playedCards[p.playedCards.length - 1];
                                if ((card === null || card === void 0 ? void 0 : card.name) === selectedCard.name) {
                                    p.playedCards.pop();
                                    return true;
                                }
                                return false;
                            });
                            return undefined;
                        }));
                    }
                },
            }));
            return undefined;
        });
    }
    getCheckLoops() {
        return this.checkLoops;
    }
    getReplayableEvents(player) {
        const playedEvents = [];
        this.checkLoops++;
        try {
            player.game.getPlayers().forEach((p) => {
                playedEvents.push(...p.playedCards.filter((card) => {
                    return card.type === CardType_1.CardType.EVENT &&
                        player.canAfford(player.getCardCost(card), {
                            reserveUnits: MoonExpansion_1.MoonExpansion.adjustedReserveCosts(player, card),
                        }) && player.simpleCanPlay(card);
                }));
            });
        }
        finally {
            this.checkLoops--;
        }
        return playedEvents;
    }
}
exports.Playwrights = Playwrights;
