"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterTreatmentComplex = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Options_1 = require("../Options");
const Tag_1 = require("../../../common/cards/Tag");
class WaterTreatmentComplex extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.WATER_TREATMENT_COMPLEX,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 12,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.habitatTiles(1, { all: Options_1.all })),
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { habitatRate: 2 },
            },
            metadata: {
                description: 'Requires 1 habitat tile on The Moon. Spend 1 titanium. Raise the habitat rate 2 steps.',
                cardNumber: 'M46',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.minus().titanium(1).br.moonHabitatRate({ amount: 2 })),
            },
        });
    }
}
exports.WaterTreatmentComplex = WaterTreatmentComplex;
//# sourceMappingURL=WaterTreatmentComplex.js.map