"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallAnimals = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class SmallAnimals extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SMALL_ANIMALS,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 6,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(6)),
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 1 },
            },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '054',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.animals(1);
                    }).br;
                    b.production((pb) => pb.minus().plants(1, { all: Options_1.all })).br;
                    b.vpText('1 VP per 2 animals on this card.');
                }),
                description: {
                    text: 'Requires 6% oxygen. Decrease any plant production 1 step.',
                    align: 'left',
                },
            },
        });
    }
}
exports.SmallAnimals = SmallAnimals;
//# sourceMappingURL=SmallAnimals.js.map