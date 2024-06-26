"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polyphemos = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Polyphemos extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.POLYPHEMOS,
            startingMegaCredits: 55,
            cardCost: 5,
            behavior: {
                production: { megacredits: 5 },
                stock: { titanium: 5 },
            },
            metadata: {
                cardNumber: 'R11',
                description: 'You start with 55 M€. Increase your M€ production 5 steps. Gain 5 titanium.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br;
                    b.megacredits(55).nbsp.production((pb) => pb.megacredits(5)).nbsp.titanium(5, { digit: Options_1.digit });
                    b.corpBox('effect', (ce) => {
                        ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand.', (eb) => {
                            eb.cards(1).asterix().startEffect.megacredits(5);
                        });
                        ce.effect('When playing a card with a basic cost of 20MC or more, draw a card.', (eb) => {
                            eb.megacredits(20).asterix().startEffect.cards(1);
                        });
                    });
                }),
            },
        });
    }
    onCardPlayed(player, card) {
        if (player.isCorporation(this.name) && card.cost >= 20) {
            player.drawCard();
        }
    }
}
exports.Polyphemos = Polyphemos;
