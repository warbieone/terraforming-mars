"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SFMemorial = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SFMemorial extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SF_MEMORIAL,
            tags: [Tag_1.Tag.BUILDING],
            cost: 7,
            victoryPoints: 1,
            behavior: {
                drawCard: 1,
            },
            metadata: {
                cardNumber: 'P41',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.cards(1)),
                description: 'Draw 1 card.',
            },
        });
    }
}
exports.SFMemorial = SFMemorial;
