"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLeak = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardResource_1 = require("../../../common/CardResource");
class DataLeak extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DATA_LEAK,
            cost: 5,
            behavior: {
                addResourcesToAnyCard: { count: 5, type: CardResource_1.CardResource.DATA },
            },
            metadata: {
                cardNumber: 'Pf30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.data({ amount: 5 }).asterix()),
                description: 'Add 5 data to ANY card.',
            },
        });
    }
}
exports.DataLeak = DataLeak;
