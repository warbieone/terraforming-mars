"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransNeptuneProbe = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
class TransNeptuneProbe extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TRANS_NEPTUNE_PROBE,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            cost: 6,
            victoryPoints: 1,
            metadata: {
                cardNumber: '084',
            },
        });
    }
}
exports.TransNeptuneProbe = TransNeptuneProbe;
