"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LagrangeObservatory = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class LagrangeObservatory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LAGRANGE_OBSERVATORY,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            cost: 9,
            victoryPoints: 1,
            behavior: {
                drawCard: 1,
            },
            metadata: {
                cardNumber: '196',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.cards(1)),
                description: 'Draw 1 card.',
            },
        });
    }
}
exports.LagrangeObservatory = LagrangeObservatory;
