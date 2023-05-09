"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResearchOutpost = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ResearchOutpost extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.RESEARCH_OUTPOST,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 18,
            behavior: {
                city: { on: 'isolated' },
            },
            cardDiscount: { amount: 1 },
            metadata: {
                cardNumber: '020',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a card, you pay 1 M€ less for it.', (eb) => {
                        eb.empty().startEffect.megacredits(-1);
                    }).br;
                    b.city();
                }),
                description: 'Place a city tile NEXT TO NO OTHER TILE.',
            },
        });
    }
}
exports.ResearchOutpost = ResearchOutpost;
