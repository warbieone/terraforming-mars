"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneRepair = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class GeneRepair extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.GENE_REPAIR,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            victoryPoints: 2,
            behavior: {
                production: { megacredits: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.SCIENCE, 3)),
            metadata: {
                cardNumber: '091',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => pb.megacredits(2))),
                description: 'Requires 3 science tags. Increase your M€ production 2 steps.',
            },
        });
    }
}
exports.GeneRepair = GeneRepair;
//# sourceMappingURL=GeneRepair.js.map