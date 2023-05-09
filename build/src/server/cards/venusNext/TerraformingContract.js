"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerraformingContract = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class TerraformingContract extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.TERRAFORMING_CONTRACT,
            cost: 8,
            tags: [Tag_1.Tag.EARTH],
            behavior: {
                production: { megacredits: 4 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tr(25)),
            metadata: {
                cardNumber: '252',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(4));
                }),
                description: 'Requires that you have at least 25 TR. Increase your M€ production 4 steps.',
            },
        });
    }
}
exports.TerraformingContract = TerraformingContract;
