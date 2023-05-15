"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionPower = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class FusionPower extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FUSION_POWER,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 14,
            behavior: {
                production: { energy: 3 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.POWER, 2)),
            metadata: {
                cardNumber: '132',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(3));
                }),
                description: 'Requires 2 power tags. Increase your energy production 3 steps.',
            },
        });
    }
}
exports.FusionPower = FusionPower;
//# sourceMappingURL=FusionPower.js.map