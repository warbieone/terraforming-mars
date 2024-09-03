"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbioticFungus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SymbioticFungus extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.SYMBIOTIC_FUNGUS,
            tags: [Tag_1.Tag.MICROBE],
            cost: 4,
            action: {
                addResourcesToAnyCard: { type: CardResource_1.CardResource.MICROBE, count: 1, autoSelect: true },
            },
            requirements: { temperature: -14 },
            metadata: {
                cardNumber: '133',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Add a microbe to ANOTHER card.', (eb) => {
                        eb.empty().startAction.resource(CardResource_1.CardResource.MICROBE).asterix();
                    });
                }),
                description: 'Requires -14 C° or warmer.',
            },
        });
    }
}
exports.SymbioticFungus = SymbioticFungus;
