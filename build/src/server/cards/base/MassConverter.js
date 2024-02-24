"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassConverter = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MassConverter extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.MASS_CONVERTER,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.POWER],
            cost: 8,
            behavior: {
                production: { energy: 6 },
            },
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 6 },
            cardDiscount: { tag: Tag_1.Tag.SPACE, amount: 2, per: 'card' },
            metadata: {
                cardNumber: '094',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you play a space card, you pay 2 M€ less for it.', (eb) => {
                        eb.space({ played: Options_1.played }).startEffect.megacredits(-2);
                    }).br;
                    b.production((pb) => pb.energy(6));
                }),
                description: 'Requires 6 science tags. Increase your energy production 6 steps.',
            },
        });
    }
}
exports.MassConverter = MassConverter;
