"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polyphemos = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Polyphemos extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.POLYPHEMOS,
            startingMegaCredits: 50,
            type: CardType_1.CardType.CORPORATION,
            cardCost: 5,
            behavior: {
                production: { megacredits: 5 },
                stock: { titanium: 5 },
            },
            metadata: {
                cardNumber: 'R11',
                description: 'You start with 50 M€. Increase your M€ production 5 steps. Gain 5 titanium.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(50).nbsp.production((pb) => pb.megacredits(5)).nbsp.titanium(5, { digit: Options_1.digit });
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand.', (eb) => {
                            eb.cards(1).asterix().startEffect.megacredits(5);
                        });
                    });
                }),
            },
        });
    }
}
exports.Polyphemos = Polyphemos;
