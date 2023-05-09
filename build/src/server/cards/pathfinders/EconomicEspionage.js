"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EconomicEspionage = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
class EconomicEspionage extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ECONOMIC_ESPIONAGE,
            cost: 8,
            tags: [Tag_1.Tag.EARTH],
            resourceType: CardResource_1.CardResource.DATA,
            victoryPoints: { resourcesHere: {}, per: 3 },
            action: {
                spend: { megacredits: 2 },
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.DATA },
            },
            metadata: {
                cardNumber: 'Pf37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 M€ to Add 1 data to ANY card.', (eb) => {
                        eb.megacredits(2).startAction.data({ amount: 1 }).asterix();
                    }).br;
                }),
                description: '1VP for every 3 data here.',
            },
        });
    }
}
exports.EconomicEspionage = EconomicEspionage;
