"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoboticWorkforce = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
const BehaviorExecutor_1 = require("../../behavior/BehaviorExecutor");
class RoboticWorkforce extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ROBOTIC_WORKFORCE,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            metadata: {
                cardNumber: '086',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Copy A', Size_1.Size.SMALL, true).nbsp;
                    b.production((pb) => pb.building(1, { played: Options_1.played }));
                }),
                description: 'Duplicate only the production box of one of your building cards.',
            },
        });
    }
    productionBehavior(behavior) {
        const filtered = {};
        if (behavior.production !== undefined) {
            filtered.production = behavior.production;
        }
        if (behavior.decreaseAnyProduction !== undefined) {
            filtered.decreaseAnyProduction = behavior.decreaseAnyProduction;
        }
        return filtered;
    }
    isCardApplicable(card, player) {
        if (!card.tags.includes(Tag_1.Tag.BUILDING) && !card.tags.includes(Tag_1.Tag.WILD)) {
            return false;
        }
        if (card.name === CardName_1.CardName.SPECIALIZED_SETTLEMENT) {
            return player.production.energy >= 1;
        }
        if (card.produce !== undefined) {
            return true;
        }
        if (card.behavior !== undefined) {
            const productionBehavior = this.productionBehavior(card.behavior);
            if (Object.keys(productionBehavior).length > 0) {
                return (0, BehaviorExecutor_1.getBehaviorExecutor)().canExecute(productionBehavior, player, card);
            }
        }
        return false;
    }
    getAvailableCards(player) {
        return player.tableau.filter((card) => this.isCardApplicable(card, player));
    }
    bespokeCanPlay(player) {
        return this.getAvailableCards(player).length > 0;
    }
    bespokePlay(player) {
        const availableCards = this.getAvailableCards(player);
        if (availableCards.length === 0) {
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select builder card to copy', 'Copy', availableCards, ([card]) => {
            player.game.log('${0} copied ${1} production with ${2}', (b) => b.player(player).card(card).card(this));
            if (card.produce) {
                card.produce(player);
            }
            else if (card.behavior !== undefined) {
                (0, BehaviorExecutor_1.getBehaviorExecutor)().execute(this.productionBehavior(card.behavior), player, card);
            }
            return undefined;
        });
    }
}
exports.RoboticWorkforce = RoboticWorkforce;
