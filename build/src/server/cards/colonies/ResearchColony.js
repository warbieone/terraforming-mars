"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchColony = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class ResearchColony extends Card_1.Card {
    constructor() {
        super({
            cost: 20,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.SCIENCE],
            name: CardName_1.CardName.RESEARCH_COLONY,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                drawCard: 2,
                colonies: { buildColony: { allowDuplicates: true } },
            },
            metadata: {
                cardNumber: 'C34',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.colonies(1).asterix().nbsp.cards(2);
                }),
                description: 'Place a colony. MAY BE PLACED WHERE YOU ALREADY HAVE A COLONY. Draw 2 cards.',
            },
        });
    }
}
exports.ResearchColony = ResearchColony;
