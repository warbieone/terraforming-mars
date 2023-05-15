"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HE3FusionPlant = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class HE3FusionPlant extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HE3_FUSION_PLANT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.POWER, Tag_1.Tag.MOON],
            cost: 12,
            behavior: {
                production: { energy: { moon: { mine: {} } } },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.miningRate(2)),
            metadata: {
                description: 'Requires the mining rate of 2 or higher. ' +
                    'Increase your energy production 1 step for each mining tile on The Moon.',
                cardNumber: 'M48',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).slash().moonMine({ all: Options_1.all });
                }),
            },
        });
    }
}
exports.HE3FusionPlant = HE3FusionPlant;
//# sourceMappingURL=HE3FusionPlant.js.map