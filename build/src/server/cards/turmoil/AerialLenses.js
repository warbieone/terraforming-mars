"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerialLenses = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const PartyName_1 = require("../../../common/turmoil/PartyName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class AerialLenses extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.AERIAL_LENSES,
            cost: 2,
            victoryPoints: -1,
            behavior: {
                production: { heat: 2 },
                removeAnyPlants: 2,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.party(PartyName_1.PartyName.KELVINISTS)),
            metadata: {
                description: 'Requires that Kelvinists are ruling or that you have 2 delegates there. Remove up to 2 plants from any player. Increase your heat production 2 steps.',
                cardNumber: 'T01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.minus().plants(-2, { all: Options_1.all }).production((pb) => pb.heat(2))),
            },
        });
    }
}
exports.AerialLenses = AerialLenses;
//# sourceMappingURL=AerialLenses.js.map