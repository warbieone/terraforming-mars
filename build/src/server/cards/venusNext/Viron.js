"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viron = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ICard_1 = require("../ICard");
const SelectCard_1 = require("../../inputs/SelectCard");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class Viron extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VIRON,
            tags: [Tag_1.Tag.MICROBE],
            startingMegaCredits: 48,
            type: CardType_1.CardType.CORPORATION,
            metadata: {
                cardNumber: 'R12',
                description: 'You start with 48 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(48);
                    b.corpBox('action', (ce) => {
                        ce.action('Use a blue card action that has already been used this generation.', (eb) => {
                            eb.empty().startAction.empty();
                        });
                    });
                }),
            },
        });
    }
    getActionCards(player) {
        const result = [];
        for (const playedCard of player.tableau) {
            if (playedCard === this) {
                continue;
            }
            if (!(0, ICard_1.isIActionCard)(playedCard)) {
                continue;
            }
            if ((0, ICard_1.isIHasCheckLoops)(playedCard) && playedCard.getCheckLoops() >= 2) {
                continue;
            }
            if (player.getActionsThisGeneration().has(playedCard.name) && playedCard.canAct(player)) {
                result.push(playedCard);
            }
        }
        return result;
    }
    canAct(player) {
        return this.getActionCards(player).length > 0 && !player.getActionsThisGeneration().has(this.name);
    }
    action(player) {
        if (this.getActionCards(player).length === 0) {
            return undefined;
        }
        return new SelectCard_1.SelectCard('Perform again an action from a played card', 'Take action', this.getActionCards(player), ([card]) => {
            const foundCard = card;
            player.game.log('${0} used ${1} action with ${2}', (b) => b.player(player).card(foundCard).card(this));
            return foundCard.action(player);
        });
    }
}
exports.Viron = Viron;
