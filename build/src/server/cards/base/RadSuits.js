"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadSuits = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class RadSuits extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RAD_SUITS,
            cost: 6,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.cities(2, { all: Options_1.all })),
            metadata: {
                cardNumber: '186',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1));
                }),
                description: 'Requires two cities in play. Increase your M€ production 1 step.',
            },
        });
    }
}
exports.RadSuits = RadSuits;
//# sourceMappingURL=RadSuits.js.map