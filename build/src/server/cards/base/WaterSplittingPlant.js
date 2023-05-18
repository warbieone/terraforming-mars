"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterSplittingPlant = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class WaterSplittingPlant extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.WATER_SPLITTING_PLANT,
            tags: [Tag_1.Tag.BUILDING],
            cost: 12,
            action: {
                spend: { energy: 3 },
                global: { oxygen: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oceans(2)),
            metadata: {
                cardNumber: '177',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 3 energy to raise oxygen 1 step.', (eb) => {
                        eb.energy(3).startAction.oxygen(1);
                    });
                }),
                description: 'Requires 2 ocean tiles.',
            },
        });
    }
}
exports.WaterSplittingPlant = WaterSplittingPlant;
//# sourceMappingURL=WaterSplittingPlant.js.map