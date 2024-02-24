"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreedingFarms = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
class BreedingFarms extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.BREEDING_FARMS,
            cost: 16,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.ANIMAL, Tag_1.Tag.BUILDING],
            behavior: {
                global: { temperature: 1 },
            },
            action: {
                spend: { plants: 1 },
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.ANIMAL, mustHaveCard: true },
            },
            requirements: [{ tag: Tag_1.Tag.SCIENCE }, { tag: Tag_1.Tag.ANIMAL }],
            metadata: {
                cardNumber: 'Pf01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 plant to add 1 animal to ANY card.', (eb) => {
                        eb.plants(1).startAction.animals(1);
                    });
                    b.br;
                    b.temperature(1);
                }),
                description: 'Requires 1 science tag and 1 animal tag. Raise the temperature 1 step.',
            },
        });
    }
}
exports.BreedingFarms = BreedingFarms;
