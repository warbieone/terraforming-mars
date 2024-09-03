"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extremophiles = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class Extremophiles extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.EXTREMOPHILES,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.MICROBE],
            cost: 3,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 3 },
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.MICROBE, count: 1 },
            },
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 2 },
            metadata: {
                cardNumber: '224',
                description: 'Requires 2 science tags.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to ANY card.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.MICROBE).asterix();
                    }).br;
                    b.vpText('1 VP for every 3rd Microbe on this card.');
                }),
            },
        });
    }
}
exports.Extremophiles = Extremophiles;
