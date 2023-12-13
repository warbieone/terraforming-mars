"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LakeMarineris = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class LakeMarineris extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.LAKE_MARINERIS,
            cost: 18,
            tr: { oceans: 2 },
            requirements: { temperature: 0 },
            victoryPoints: 2,
            behavior: {
                ocean: { count: 2 },
            },
            metadata: {
                cardNumber: '053',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.oceans(2)),
                description: 'Requires 0° C or warmer. Place 2 ocean tiles.',
            },
        });
    }
}
exports.LakeMarineris = LakeMarineris;
//# sourceMappingURL=LakeMarineris.js.map