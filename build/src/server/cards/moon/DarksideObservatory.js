"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DarksideObservatory = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const MoonCards_1 = require("../../moon/MoonCards");
const Card_1 = require("../Card");
const SelectCard_1 = require("../../inputs/SelectCard");
class DarksideObservatory extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DARKSIDE_OBSERVATORY,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            metadata: {
                cardNumber: 'M75',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 science to ANY card [EXCEPT those giving 2 VP or more per science resource.]', (ab) => {
                        ab.empty().startAction.science(1).asterix();
                    }).br;
                    b.or().br;
                    b.action('Add 2 data to ANY card.', (ab) => {
                        ab.empty().startAction.data({ amount: 2 }).asterix();
                    });
                }),
            },
        });
    }
    include(card) {
        return card.resourceType === CardResource_1.CardResource.DATA || MoonCards_1.MoonCards.scienceCardsWithLessThan2VP.has(card.name);
    }
    canAct(player) {
        return player.playedCards.some(this.include) || player.corporations.some(this.include);
    }
    addResource(card, player) {
        if (card.resourceType === CardResource_1.CardResource.DATA) {
            player.addResourceTo(card, { qty: 2, log: true });
        }
        if (card.resourceType === CardResource_1.CardResource.SCIENCE) {
            player.addResourceTo(card, { qty: 1, log: true });
        }
    }
    action(player) {
        const playableCards = [
            ...player.playedCards.filter((c) => this.include(c)),
            ...player.corporations.filter((c) => this.include(c)),
        ];
        return new SelectCard_1.SelectCard('Select card to add EITHER 1 science resource OR 2 Data resources', 'Add', playableCards, ([card]) => {
            this.addResource(card, player);
            return undefined;
        });
    }
}
exports.DarksideObservatory = DarksideObservatory;
