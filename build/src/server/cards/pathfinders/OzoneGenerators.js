"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OzoneGenerators = void 0;
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Tag_1 = require("../../../common/cards/Tag");
class OzoneGenerators extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.OZONE_GENERATORS,
            cost: 14,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.SPACE],
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(6)),
            action: {
                spend: { energy: 3 },
                tr: 1,
            },
            metadata: {
                cardNumber: 'Pf36',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 3 energy to gain 1 TR.', (eb) => eb.energy(3).startAction.tr(1));
                }),
                description: 'Requires 6% Oxygen.',
            },
        });
    }
}
exports.OzoneGenerators = OzoneGenerators;
//# sourceMappingURL=OzoneGenerators.js.map