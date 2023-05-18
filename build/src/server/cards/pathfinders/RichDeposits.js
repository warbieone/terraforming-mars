"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichDeposits = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../requirements/CardRequirements");
const Tag_1 = require("../../../common/cards/Tag");
class RichDeposits extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.RICH_DEPOSITS,
            cost: 12,
            behavior: {
                production: { steel: 3 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 2)),
            metadata: {
                cardNumber: 'Pf52',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.steel(3))),
                description: 'Requires 2 science tags. Increase your steel production 3 steps.',
            },
        });
    }
}
exports.RichDeposits = RichDeposits;
//# sourceMappingURL=RichDeposits.js.map