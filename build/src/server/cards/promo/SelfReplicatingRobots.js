"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfReplicatingRobots = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Size_1 = require("../../../common/cards/render/Size");
class SelfReplicatingRobots extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SELF_REPLICATING_ROBOTS,
            cost: 7,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: '210',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Reveal and place a SPACE OR BUILDING card here from hand, and place 2 resources on it, OR double the resources on a card here.', (eb) => {
                        eb.empty().startAction.selfReplicatingRobots();
                        eb.nbsp.or().nbsp.arrow().multiplierWhite().text('x2');
                    }).br;
                    b.text('Effect: Card here may be played as if from hand with its cost reduced by the number of resources on it.', Size_1.Size.TINY, true);
                }),
                description: 'Requires 2 science tags.',
            },
        });
        this.targetCards = [];
    }
    getCardDiscount(_player, card) {
        for (const targetCard of this.targetCards) {
            if (targetCard.card.name === card.name) {
                return targetCard.resourceCount;
            }
        }
        return 0;
    }
    canAct(player) {
        return this.targetCards.length > 0 ||
            player.cardsInHand.some((card) => card.tags.some((tag) => tag === Tag_1.Tag.SPACE || tag === Tag_1.Tag.BUILDING));
    }
    action(player) {
        const orOptions = new OrOptions_1.OrOptions();
        const selectableCards = player.cardsInHand.filter((card) => card.tags.some((tag) => tag === Tag_1.Tag.SPACE || tag === Tag_1.Tag.BUILDING));
        if (this.targetCards.length > 0) {
            const robotCards = this.targetCards.map((targetCard) => targetCard.card);
            orOptions.options.push(new SelectCard_1.SelectCard('Select card to double robots resource', 'Double resource', robotCards, ([card]) => {
                let resourceCount = 0;
                for (const targetCard of this.targetCards) {
                    if (targetCard.card.name === card.name) {
                        resourceCount = targetCard.resourceCount;
                        targetCard.resourceCount *= 2;
                    }
                }
                player.game.log('${0} doubled resources on ${1} from ${2} to ${3}', (b) => {
                    b.player(player).card(card).number(resourceCount).number(resourceCount * 2);
                });
                return undefined;
            }, { played: CardName_1.CardName.SELF_REPLICATING_ROBOTS }));
        }
        if (selectableCards.length > 0) {
            orOptions.options.push(new SelectCard_1.SelectCard('Select card to link with Self-Replicating Robots', 'Link card', selectableCards, ([card]) => {
                const projectCardIndex = player.cardsInHand.findIndex((c) => c.name === card.name);
                player.cardsInHand.splice(projectCardIndex, 1);
                this.targetCards.push({
                    card: card,
                    resourceCount: 2,
                });
                player.game.log('${0} linked ${1} with ${2}', (b) => b.player(player).card(card).card(this));
                return undefined;
            }, { played: CardName_1.CardName.SELF_REPLICATING_ROBOTS }));
        }
        return orOptions;
    }
}
exports.SelfReplicatingRobots = SelfReplicatingRobots;
