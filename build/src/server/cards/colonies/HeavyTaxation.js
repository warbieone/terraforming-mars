"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeavyTaxation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class HeavyTaxation extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.HEAVY_TAXATION,
            type: CardType_1.CardType.AUTOMATED,
            victoryPoints: -1,
            behavior: {
                production: { megacredits: 2 },
                stock: { megacredits: 4 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.tag(Tag_1.Tag.EARTH, 2)),
            metadata: {
                cardNumber: 'C14',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(2)).nbsp.megacredits(4);
                }),
                description: 'Requires 2 Earth tags. Increase your M€ production 2 steps, and gain 4 M€.',
            },
        });
    }
}
exports.HeavyTaxation = HeavyTaxation;
