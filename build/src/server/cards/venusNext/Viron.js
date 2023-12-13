"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Viron = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const Tag_1 = require("../../../common/cards/Tag");
const ICard_1 = require("../ICard");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Viron extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.VIRON,
            tags: [Tag_1.Tag.MICROBE],
            startingMegaCredits: 54,
            metadata: {
                cardNumber: 'R12',
                description: 'You start with 54 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(54);
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
        return new SelectCard_1.SelectCard('Perform again an action from a played card', 'Take action', this.getActionCards(player))
            .andThen(([card]) => {
            player.game.log('${0} used ${1} action with ${2}', (b) => b.player(player).card(card).card(this));
            return card.action(player);
        });
    }
}
exports.Viron = Viron;
//# sourceMappingURL=Viron.js.map