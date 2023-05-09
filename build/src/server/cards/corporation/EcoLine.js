"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoLine = void 0;
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class EcoLine extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.ECOLINE,
            tags: [Tag_1.Tag.PLANT],
            startingMegaCredits: 36,
            behavior: {
                production: { plants: 2 },
                stock: { plants: 3 },
                greeneryDiscount: 1,
            },
            metadata: {
                cardNumber: 'R17',
                description: 'You start with 2 plant production, 3 plants, and 36 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.production((pb) => pb.plants(2)).nbsp.megacredits(36).plants(3, { digit: Options_1.digit });
                    b.corpBox('effect', (ce) => {
                        ce.effect('You may always pay 7 plants, instead of 8, to place greenery.', (eb) => {
                            eb.plants(7, { digit: Options_1.digit }).startAction.greenery();
                        });
                    });
                }),
            },
        });
    }
}
exports.EcoLine = EcoLine;
