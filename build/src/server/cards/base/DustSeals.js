"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DustSeals = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Options_1 = require("../Options");
class DustSeals extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DUST_SEALS,
            cost: 2,
            victoryPoints: 1,
            requirements: { oceans: 3, max: Options_1.max },
            metadata: {
                description: 'Requires 3 or less ocean tiles.',
                cardNumber: '119',
            },
        });
    }
}
exports.DustSeals = DustSeals;
