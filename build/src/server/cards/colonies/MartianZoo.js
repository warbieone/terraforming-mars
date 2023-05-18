"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianZoo = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Options_1 = require("../Options");
class MartianZoo extends Card_1.Card {
    constructor() {
        super({
            cost: 12,
            tags: [Tag_1.Tag.ANIMAL, Tag_1.Tag.BUILDING],
            name: CardName_1.CardName.MARTIAN_ZOO,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.ANIMAL,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.cities(2, { all: Options_1.all })),
            victoryPoints: 1,
            metadata: {
                cardNumber: 'C24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play an Earth tag, place an animal here.', (eb) => {
                        eb.earth(1, { played: Options_1.played }).startEffect.animals(1);
                    }).br;
                    b.action('Gain 1M€ per animal here.', (eb) => {
                        eb.empty().startAction.megacredits(1).slash().animals(1);
                    });
                }),
                description: {
                    text: 'Requires 2 city tiles in play.',
                    align: 'left',
                },
            },
        });
    }
    onCardPlayed(player, card) {
        const count = player.tags.cardTagCount(card, Tag_1.Tag.EARTH);
        if (count > 0) {
            player.addResourceTo(this, count);
        }
    }
    canAct() {
        return this.resourceCount > 0;
    }
    action(player) {
        player.addResource(Resource_1.Resource.MEGACREDITS, this.resourceCount, { log: true });
        return undefined;
    }
}
exports.MartianZoo = MartianZoo;
//# sourceMappingURL=MartianZoo.js.map