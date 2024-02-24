"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreyjaBiodomes = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class FreyjaBiodomes extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.FREYJA_BIODOMES,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.VENUS],
            cost: 14,
            requirements: { venus: 10 },
            victoryPoints: 2,
            behavior: {
                production: { energy: -1, megacredits: 2 },
            },
            metadata: {
                cardNumber: '227',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.microbes(2, { secondaryTag: Tag_1.Tag.VENUS }).or().animals(2, { secondaryTag: Tag_1.Tag.VENUS }).br;
                    b.production((pb) => pb.minus().energy(1).nbsp.plus().megacredits(2));
                }),
                description: {
                    text: 'Requires 10% on the Venus track. Add 2 microbes or 2 animals to another Venus card. Production: energy -1, M€ +2.',
                    align: 'left',
                },
            },
        });
    }
    getResCards(player) {
        let resourceCards = player.getResourceCards(CardResource_1.CardResource.ANIMAL);
        resourceCards = resourceCards.concat(player.getResourceCards(CardResource_1.CardResource.MICROBE));
        return resourceCards.filter((card) => card.tags.includes(Tag_1.Tag.VENUS));
    }
    bespokePlay(player) {
        const cards = this.getResCards(player);
        if (cards.length > 1) {
            return new SelectCard_1.SelectCard('Select card to add 2 resources', 'Add resources', cards)
                .andThen(([card]) => {
                player.addResourceTo(card, { qty: 2, log: true });
                return undefined;
            });
        }
        if (cards.length === 1) {
            player.addResourceTo(cards[0], { qty: 2, log: true });
        }
        return undefined;
    }
}
exports.FreyjaBiodomes = FreyjaBiodomes;
