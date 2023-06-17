"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewColonyPlanningInitiaitives = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Card_1 = require("../Card");
const Tag_1 = require("../../../common/cards/Tag");
class NewColonyPlanningInitiaitives extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.NEW_COLONY_PLANNING_INITIAITIVES,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 6,
            behavior: {
                moon: { habitatRate: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.habitatRate(2)),
            metadata: {
                description: 'Requires the habitat rate to be 2 or higher. Raise the habitat rate 1 step.',
                cardNumber: 'M31',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonHabitatRate();
                }),
            },
        });
    }
}
exports.NewColonyPlanningInitiaitives = NewColonyPlanningInitiaitives;
//# sourceMappingURL=NewColonyPlanningInitiaitives.js.map