"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerosportTournament = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class AerosportTournament extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.AEROSPORT_TOURNAMENT,
            type: CardType_1.CardType.EVENT,
            cost: 7,
            requirements: { floaters: 5 },
            victoryPoints: 1,
            behavior: {
                stock: { megacredits: { cities: {} } },
            },
            metadata: {
                cardNumber: '214',
                description: 'Requires that you have 5 floaters. Gain 1 M€ per each city tile in play.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.megacredits(1).slash().city({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
        });
    }
}
exports.AerosportTournament = AerosportTournament;
//# sourceMappingURL=AerosportTournament.js.map