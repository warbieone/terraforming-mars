"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagneticShield = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MagneticShield extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.MAGNETIC_SHIELD,
            tags: [Tag_1.Tag.SPACE],
            cost: 24,
            behavior: {
                tr: 4,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.POWER, 3)),
            metadata: {
                cardNumber: 'X24',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.tr(4, { digit: Options_1.digit })),
                description: 'Requires 3 power tags. Raise your TR 4 steps.',
            },
        });
    }
}
exports.MagneticShield = MagneticShield;
//# sourceMappingURL=MagneticShield.js.map