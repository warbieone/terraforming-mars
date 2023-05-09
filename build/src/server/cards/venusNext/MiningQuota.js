"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningQuota = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class MiningQuota extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MINING_QUOTA,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 5,
            behavior: {
                production: { steel: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.VENUS).tag(Tag_1.Tag.EARTH).tag(Tag_1.Tag.JOVIAN)),
            metadata: {
                cardNumber: '239',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.steel(2));
                }),
                description: 'Requires Venus, Earth and Jovian tags. Increase your steel production 2 steps.',
            },
        });
    }
}
exports.MiningQuota = MiningQuota;
