"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MicrosingularityPlant = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const CardRequirements_1 = require("../CardRequirements");
const Options_1 = require("../Options");
class MicrosingularityPlant extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MICROSINGULARITY_PLANT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.POWER],
            cost: 10,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.habitatTiles(2, { all: Options_1.all })),
            behavior: {
                production: { energy: 2 },
            },
            metadata: {
                description: 'Requires 2 habitats on The Moon. Increase your energy production 2 steps.',
                cardNumber: 'M40',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(2));
                }),
            },
        });
    }
}
exports.MicrosingularityPlant = MicrosingularityPlant;
//# sourceMappingURL=MicrosingularityPlant.js.map