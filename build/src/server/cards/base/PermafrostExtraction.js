"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermafrostExtraction = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class PermafrostExtraction extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.PERMAFROST_EXTRACTION,
            cost: 8,
            behavior: {
                ocean: {},
            },
            requirements: { temperature: -8 },
            metadata: {
                cardNumber: '191',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oceans(1);
                }),
                description: 'Requires -8 C or warmer. Place 1 ocean tile.',
            },
        });
    }
}
exports.PermafrostExtraction = PermafrostExtraction;
