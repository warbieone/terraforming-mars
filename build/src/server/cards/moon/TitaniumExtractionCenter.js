"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitaniumExtractionCenter = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class TitaniumExtractionCenter extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.TITANIUM_EXTRACTION_CENTER,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 14,
            reserveUnits: { titanium: 2 },
            behavior: {
                production: { titanium: { moon: { miningRate: {} }, per: 2 } },
            },
            metadata: {
                description: 'Spend 2 titanium. Increase your titanium production 1 step for every 2 raised steps of mining rate.',
                cardNumber: 'M26',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).br;
                    b.production((pb) => pb.titanium(1)).slash().moonMiningRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.TitaniumExtractionCenter = TitaniumExtractionCenter;
