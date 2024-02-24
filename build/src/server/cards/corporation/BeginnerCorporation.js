"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeginnerCorporation = void 0;
const CorporationCard_1 = require("./CorporationCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class BeginnerCorporation extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.BEGINNER_CORPORATION,
            behavior: {
                drawCard: 10,
            },
            metadata: {
                cardNumber: 'R00',
                description: 'You start with 42 M€. Instead of choosing from 10 cards during setup, you get 10 cards for free.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(42).nbsp.cards(10, { digit: Options_1.digit });
                }),
            },
            startingMegaCredits: 42,
        });
    }
}
exports.BeginnerCorporation = BeginnerCorporation;
