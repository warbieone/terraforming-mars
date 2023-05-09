"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessorFactory = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class ProcessorFactory extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.PROCESSOR_FACTORY,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 8,
            action: {
                spend: { steel: 1 },
                addResourcesToAnyCard: { type: CardResource_1.CardResource.DATA, count: 2 },
            },
            resourceType: CardResource_1.CardResource.DATA,
            victoryPoints: { resourcesHere: {}, per: 3 },
            metadata: {
                cardNumber: 'M86',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 steel to add 2 data resources to ANY card.', (eb) => eb.startAction.steel(1).arrow().data({ amount: 2 }).asterix());
                    b.br;
                    b.vpText('1 VP for every 3 data resources here.');
                }),
            },
        });
    }
}
exports.ProcessorFactory = ProcessorFactory;
