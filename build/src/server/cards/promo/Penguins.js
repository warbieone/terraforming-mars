"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Penguins = void 0;
const ActionCard_1 = require("../ActionCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class Penguins extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PENGUINS,
            tags: [Tag_1.Tag.ANIMAL],
            cost: 7,
            resourceType: CardResource_1.CardResource.ANIMAL,
            victoryPoints: { resourcesHere: {} },
            action: {
                addResources: 1,
            },
            requirements: { oceans: 8 },
            metadata: {
                cardNumber: '212',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 animal to this card.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.ANIMAL);
                    }).br;
                    b.vpText('1 VP for each animal on this card.');
                }),
                description: 'Requires 8 oceans.',
            },
        });
    }
}
exports.Penguins = Penguins;
