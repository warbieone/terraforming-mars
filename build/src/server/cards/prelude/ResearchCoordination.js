"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchCoordination = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
class ResearchCoordination extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RESEARCH_COORDINATION,
            tags: [Tag_1.Tag.WILD],
            cost: 4,
            metadata: {
                cardNumber: 'P40',
                description: 'After being played, when you perform an action, the wild tag counts as any tag of your choice.',
            },
        });
    }
}
exports.ResearchCoordination = ResearchCoordination;
