"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheungShingMARS = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class CheungShingMARS extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.CHEUNG_SHING_MARS,
            tags: [Tag_1.Tag.BUILDING],
            startingMegaCredits: 44,
            behavior: {
                production: { megacredits: 3 },
            },
            cardDiscount: { tag: Tag_1.Tag.BUILDING, amount: 2 },
            metadata: {
                cardNumber: 'R16',
                description: 'You start with 3 M€ production and 44 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.production((pb) => pb.megacredits(3)).nbsp.megacredits(44);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you play a building tag, you pay 2 M€ less for it.', (eb) => {
                            eb.building(1, { played: Options_1.played }).startEffect.megacredits(-2);
                        });
                    });
                }),
            },
        });
    }
}
exports.CheungShingMARS = CheungShingMARS;
