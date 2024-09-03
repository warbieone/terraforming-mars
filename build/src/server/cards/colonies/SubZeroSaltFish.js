"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubZeroSaltFish = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
const Options_1 = require("../Options");
class SubZeroSaltFish extends ActionCard_1.ActionCard {
    constructor() {
        super({
            cost: 5,
            tags: [Tag_1.Tag.ANIMAL],
            name: CardName_1.CardName.SUBZERO_SALT_FISH,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {}, per: 2 },
            requirements: { temperature: -6 },
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.PLANTS, count: 1 },
            },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: 'C42',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.ANIMAL);
                    }).br;
                    b.production((pb) => pb.minus().plants(1, { all: Options_1.all })).br;
                    b.vpText('1 VP per 2 animals on this card.');
                }),
                description: {
                    text: 'Requires -6 C. Decrease any plant production 1 step.',
                    align: 'left',
                },
            },
        });
    }
}
exports.SubZeroSaltFish = SubZeroSaltFish;
