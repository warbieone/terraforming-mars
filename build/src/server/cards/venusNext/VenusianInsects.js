"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusianInsects = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class VenusianInsects extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.VENUSIAN_INSECTS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.MICROBE],
            cost: 5,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 2 },
            action: {
                addResources: 1,
            },
            requirements: { venus: 12 },
            metadata: {
                cardNumber: '260',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.vpText('1 VP for every 2nd Microbe on this card.');
                }),
                description: 'Requires Venus 12%.',
            },
        });
    }
}
exports.VenusianInsects = VenusianInsects;
