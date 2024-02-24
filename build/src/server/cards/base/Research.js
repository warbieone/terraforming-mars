"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Research = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Research extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RESEARCH,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SCIENCE],
            cost: 11,
            victoryPoints: 1,
            behavior: {
                drawCard: 2,
            },
            metadata: {
                cardNumber: '090',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2);
                }),
                description: 'Counts as playing 2 science cards. Draw 2 cards.',
            },
        });
    }
}
exports.Research = Research;
