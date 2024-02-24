"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IronExtractionCenter = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class IronExtractionCenter extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.IRON_EXTRACTION_CENTER,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 10,
            reserveUnits: { titanium: 1 },
            behavior: {
                production: { steel: { moon: { miningRate: {} }, per: 2 } },
            },
            metadata: {
                description: 'Spend 1 titanium. Increase your steel production 1 step for every 2 raised steps of mining rate.',
                cardNumber: 'M25',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).br;
                    b.production((pb) => pb.steel(1)).slash().moonMiningRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.IronExtractionCenter = IronExtractionCenter;
