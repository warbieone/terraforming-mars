"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thorgate = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Thorgate extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.THORGATE,
            tags: [Tag_1.Tag.POWER],
            startingMegaCredits: 48,
            behavior: {
                production: { energy: 1 },
            },
            cardDiscount: { tag: Tag_1.Tag.POWER, amount: 3 },
            metadata: {
                cardNumber: 'R13',
                description: 'You start with 1 energy production and 48 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.energy(1)).nbsp.megacredits(48);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When playing a power card OR THE STANDARD PROJECT POWER PLANT, you pay 3 M€ less for it.', (eb) => {
                            eb.energy(1, { played: Options_1.played }).asterix().startEffect.megacredits(-3);
                        });
                    });
                }),
            },
        });
    }
}
exports.Thorgate = Thorgate;
