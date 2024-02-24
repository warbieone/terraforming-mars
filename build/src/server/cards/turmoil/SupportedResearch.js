"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedResearch = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SupportedResearch extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            tags: [Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.SUPPORTED_RESEARCH,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                drawCard: 2,
            },
            requirements: { party: PartyName_1.PartyName.SCIENTISTS },
            metadata: {
                cardNumber: 'T14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2);
                }),
                description: 'Requires that Scientists are ruling or that you have 2 delegates there. Draw 2 cards.',
            },
        });
    }
}
exports.SupportedResearch = SupportedResearch;
