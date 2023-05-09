"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aphrodite = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Aphrodite extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.APHRODITE,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.VENUS],
            startingMegaCredits: 50,
            type: CardType_1.CardType.CORPORATION,
            behavior: {
                production: { plants: 2 },
            },
            metadata: {
                cardNumber: 'R01',
                description: 'You start with 2 plant production and 50 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.plants(2)).nbsp.megacredits(50);
                    b.corpBox('effect', (ce) => {
                        ce.effect('Whenever Venus is terraformed 1 step, you gain 2 M€.', (eb) => {
                            eb.venus(1, { all: Options_1.all }).startEffect.megacredits(2);
                        });
                    });
                }),
            },
        });
    }
}
exports.Aphrodite = Aphrodite;
