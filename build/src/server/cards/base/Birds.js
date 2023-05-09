"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Birds = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Birds extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.BIRDS,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 10,
            resourceType: CardResource_1.CardResource.ANIMAL,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(13)),
            victoryPoints: { resourcesHere: {} },
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 2 },
            },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '072',
                description: 'Requires 13% oxygen. Decrease any plant production 2 steps. 1 VP per animal on this card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add an animal to this card.', (eb) => {
                        eb.empty().startAction.animals(1);
                    }).br;
                    b.production((pb) => {
                        pb.minus().plants(-2, { all: Options_1.all });
                    });
                }),
            },
        });
    }
}
exports.Birds = Birds;
