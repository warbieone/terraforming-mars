"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusianAnimals = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class VenusianAnimals extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VENUSIAN_ANIMALS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.ANIMAL, Tag_1.Tag.SCIENCE],
            cost: 15,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: { venus: 18 },
            metadata: {
                cardNumber: '259',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a science tag, including this, add 1 animal to this card.', (eb) => {
                        eb.science(1, { played: Options_1.played }).startEffect.animals(1);
                    }).br;
                    b.vpText('1 VP per animal on this card.');
                }),
                description: 'Requires Venus 18%',
            },
        });
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, Tag_1.Tag.SCIENCE);
        player.addResourceTo(this, { qty, log: true });
    }
}
exports.VenusianAnimals = VenusianAnimals;
