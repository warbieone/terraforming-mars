"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Psychrophiles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Psychrophiles extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PSYCHROPHILES,
            tags: [Tag_1.Tag.MICROBE],
            cost: 2,
            resourceType: CardResource_1.CardResource.MICROBE,
            action: {
                addResources: 1,
            },
            requirements: { temperature: -20, max: Options_1.max },
            metadata: {
                cardNumber: 'P39',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.MICROBE);
                    }).br;
                    b.effect('When paying for a plant card, microbes here may be used as 2 M€ each.', (eb) => {
                        eb.tag(Tag_1.Tag.PLANT).startEffect.resource(CardResource_1.CardResource.MICROBE).equals().megacredits(2);
                    });
                }),
                description: 'Temperature must be -20 C or lower.',
            },
        });
    }
}
exports.Psychrophiles = Psychrophiles;
