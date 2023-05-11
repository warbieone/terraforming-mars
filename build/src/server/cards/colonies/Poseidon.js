"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poseidon = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class Poseidon extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.POSEIDON,
            startingMegaCredits: 40,
            type: CardType_1.CardType.CORPORATION,
            firstAction: {
                text: 'Place a colony',
                colonies: { buildColony: {} },
            },
            metadata: {
                cardNumber: 'R02',
                description: 'You start with 40 M€. As your first action, place a colony.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br;
                    b.megacredits(45).nbsp.colonies(1);
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you place a colony, including this, raise your M€ production 2 step.', (eb) => {
                            eb.colonies(1).startEffect.production((pb) => pb.megacredits(2));
                        });
                    });
                }),
            },
        });
    }
}
exports.Poseidon = Poseidon;
