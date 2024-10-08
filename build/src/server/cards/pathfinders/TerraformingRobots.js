"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraformingRobots = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
class TerraformingRobots extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.TERRAFORMING_ROBOTS,
            cost: 10,
            tags: [Tag_1.Tag.SCIENCE],
            resourceType: CardResource_1.CardResource.SPECIALIZED_ROBOT,
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 4 },
            victoryPoints: { resourcesHere: {} },
            metadata: {
                cardNumber: 'PfT12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a Mars tag, add 1 specialized robot on this card.', (eb) => {
                        eb.tag(Tag_1.Tag.MARS).startEffect.resource(CardResource_1.CardResource.SPECIALIZED_ROBOT);
                    }).br;
                    b.vpText('1 VP for every specialized robot on this card.');
                }),
                description: 'Requires 4 science tags.',
            },
        });
    }
    onCardPlayed(player, card) {
        const qty = player.tags.cardTagCount(card, Tag_1.Tag.MARS);
        player.addResourceTo(this, { log: true, qty });
    }
}
exports.TerraformingRobots = TerraformingRobots;
