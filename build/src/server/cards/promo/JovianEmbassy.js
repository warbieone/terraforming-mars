"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JovianEmbassy = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class JovianEmbassy extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.JOVIAN_EMBASSY,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.BUILDING],
            cost: 14,
            victoryPoints: 1,
            behavior: {
                tr: 1,
            },
            metadata: {
                cardNumber: 'X23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(1);
                }),
                description: 'Raise your TR 1 step.',
            },
        });
    }
}
exports.JovianEmbassy = JovianEmbassy;
