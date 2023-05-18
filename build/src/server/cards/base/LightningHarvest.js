"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightningHarvest = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class LightningHarvest extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LIGHTNING_HARVEST,
            cost: 8,
            tags: [Tag_1.Tag.POWER],
            victoryPoints: 1,
            behavior: {
                production: { energy: 1, megacredits: 1 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            metadata: {
                cardNumber: '046',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).megacredits(1));
                }),
                description: 'Requires 3 science tags. Increase your energy production and your M€ production one step each.',
            },
        });
    }
}
exports.LightningHarvest = LightningHarvest;
//# sourceMappingURL=LightningHarvest.js.map