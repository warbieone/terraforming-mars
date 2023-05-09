"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyDemonstration = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TechnologyDemonstration extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.TECHNOLOGY_DEMONSTRATION,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE],
            cost: 5,
            behavior: {
                drawCard: 2,
            },
            metadata: {
                cardNumber: '204',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2);
                }),
                description: 'Draw two cards.',
            },
        });
    }
}
exports.TechnologyDemonstration = TechnologyDemonstration;
