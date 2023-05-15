"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fish = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Fish extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.FISH,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 9,
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 1 },
            },
            action: {
                addResources: 1,
            },
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(2)),
            metadata: {
                cardNumber: '052',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.animals(1);
                    }).br;
                    b.production((pb) => pb.minus().plants(1, { all: Options_1.all })).br;
                    b.vpText('1 VP for each animal on this card.');
                }),
                description: {
                    text: 'Requires +2 C° or warmer. Decrease any plant production 1 step.',
                    align: 'left',
                },
            },
        });
    }
}
exports.Fish = Fish;
//# sourceMappingURL=Fish.js.map