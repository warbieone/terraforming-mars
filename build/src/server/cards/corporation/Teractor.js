"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teractor = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Teractor extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.TERACTOR,
            tags: [Tag_1.Tag.EARTH],
            startingMegaCredits: 60,
            cardDiscount: { tag: Tag_1.Tag.EARTH, amount: 3 },
            metadata: {
                cardNumber: 'R30',
                description: 'You start with 60 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(60);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play an Earth tag, you pay 3 M€ less for it.', (eb) => {
                            eb.earth(1, { played: Options_1.played }).startEffect.megacredits(-3);
                        });
                    });
                }),
            },
        });
    }
}
exports.Teractor = Teractor;
