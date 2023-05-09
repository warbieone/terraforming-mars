"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeatIndustry = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Resource_1 = require("../../../common/Resource");
class MeatIndustry extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MEAT_INDUSTRY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 5,
            metadata: {
                cardNumber: 'X25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you gain an animal to ANY CARD, gain 2 M€.', (eb) => {
                        eb.animals(1).asterix().startEffect.megacredits(2);
                    });
                }),
            },
        });
    }
    onResourceAdded(player, card, count) {
        if (card.resourceType === CardResource_1.CardResource.ANIMAL) {
            player.addResource(Resource_1.Resource.MEGACREDITS, count * 2, { log: true });
        }
    }
}
exports.MeatIndustry = MeatIndustry;
