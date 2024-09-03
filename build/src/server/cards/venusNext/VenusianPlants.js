"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusianPlants = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const SelectCard_1 = require("../../inputs/SelectCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class VenusianPlants extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.VENUSIAN_PLANTS,
            cost: 13,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.PLANT],
            requirements: { venus: 16 },
            victoryPoints: 1,
            behavior: {
                global: { venus: 1 },
            },
            metadata: {
                cardNumber: '261',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).br.br;
                    b.resource(CardResource_1.CardResource.MICROBE, { secondaryTag: Tag_1.Tag.VENUS }).nbsp;
                    b.or().nbsp.resource(CardResource_1.CardResource.ANIMAL, { secondaryTag: Tag_1.Tag.VENUS });
                }),
                description: {
                    text: 'Requires Venus 16%. Raise Venus 1 step. Add 1 microbe or 1 animal to ANOTHER VENUS CARD',
                    align: 'left',
                },
            },
        });
    }
    bespokePlay(player) {
        const cards = this.getResCards(player);
        if (cards.length === 0)
            return undefined;
        if (cards.length === 1) {
            player.addResourceTo(cards[0], { log: true });
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select card to add 1 resource', 'Add resource', cards)
            .andThen(([card]) => {
            player.addResourceTo(card, { log: true });
            return undefined;
        });
    }
    getResCards(player) {
        let resourceCards = player.getResourceCards(CardResource_1.CardResource.MICROBE);
        resourceCards = resourceCards.concat(player.getResourceCards(CardResource_1.CardResource.ANIMAL));
        return resourceCards.filter((card) => card.tags.includes(Tag_1.Tag.VENUS));
    }
}
exports.VenusianPlants = VenusianPlants;
