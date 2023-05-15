"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EosChasmaNationalPark = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class EosChasmaNationalPark extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.EOS_CHASMA_NATIONAL_PARK,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.BUILDING],
            cost: 16,
            victoryPoints: 1,
            behavior: {
                production: { megacredits: 2 },
                stock: { plants: 3 },
                addResourcesToAnyCard: { count: 1, type: CardResource_1.CardResource.ANIMAL },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(-12)),
            metadata: {
                cardNumber: '026',
                description: 'Requires -12 C or warmer. Add 1 animal TO ANY ANIMAL CARD. Gain 3 plants. Increase your M€ production 2 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.animals(1).asterix().plants(3).br;
                    b.production((pb) => pb.megacredits(2));
                }),
            },
        });
    }
}
exports.EosChasmaNationalPark = EosChasmaNationalPark;
//# sourceMappingURL=EOSChasmaNationalPark.js.map