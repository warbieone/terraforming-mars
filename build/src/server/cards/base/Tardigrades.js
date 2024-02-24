"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tardigrades = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Tardigrades extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.TARDIGRADES,
            tags: [Tag_1.Tag.MICROBE],
            cost: 4,
            resourceType: CardResource_1.CardResource.MICROBE,
            victoryPoints: { resourcesHere: {}, per: 4 },
            action: {
                addResources: 1,
            },
            metadata: {
                cardNumber: '049',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add 1 microbe to this card.', (eb) => {
                        eb.empty().startAction.microbes(1);
                    }).br;
                    b.vpText('1 VP per 4 Microbes on this card.');
                }),
            },
        });
    }
}
exports.Tardigrades = Tardigrades;
