"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicCelebrations = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
class PublicCelebrations extends Card_1.Card {
    constructor() {
        super({
            cost: 8,
            tags: [],
            name: CardName_1.CardName.PUBLIC_CELEBRATIONS,
            type: CardType_1.CardType.EVENT,
            requirements: { chairman: true },
            victoryPoints: 2,
            metadata: {
                description: 'Requires that you are Chairman.',
                cardNumber: 'T10',
            },
        });
    }
}
exports.PublicCelebrations = PublicCelebrations;
