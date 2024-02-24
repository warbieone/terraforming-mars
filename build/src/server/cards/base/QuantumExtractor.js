"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuantumExtractor = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class QuantumExtractor extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.QUANTUM_EXTRACTOR,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.POWER],
            cost: 13,
            behavior: {
                production: { energy: 4 },
            },
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 4 },
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 2 },
            metadata: {
                cardNumber: '079',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 2 M€ less for it.', (eb) => {
                        eb.space({ played: Options_1.played }).startEffect.megacredits(-2);
                    }).br;
                    b.production((pb) => pb.energy(4, { digit: Options_1.digit }));
                }),
                description: 'Requires 4 science tags. Increase your energy production 4 steps.',
            },
        });
    }
}
exports.QuantumExtractor = QuantumExtractor;
