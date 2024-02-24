"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubterraneanReservoir = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SubterraneanReservoir extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SUBTERRANEAN_RESERVOIR,
            cost: 11,
            behavior: {
                ocean: {},
            },
            metadata: {
                cardNumber: '127',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1);
                }),
                description: 'Place 1 ocean tile.',
            },
        });
    }
}
exports.SubterraneanReservoir = SubterraneanReservoir;
