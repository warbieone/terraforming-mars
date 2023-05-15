"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaStagingStation = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const CardRequirements_1 = require("../CardRequirements");
const Card_1 = require("../Card");
class LunaStagingStation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_STAGING_STATION,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 12,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { logisticsRate: 2 },
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.logisticRate(2)),
            metadata: {
                description: 'Requires the logistic rate to be 2 or higher. Spend 1 titanium. Raise the logistic rate 2 steps.',
                cardNumber: 'M30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).br;
                    b.moonLogisticsRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.LunaStagingStation = LunaStagingStation;
//# sourceMappingURL=LunaStagingStation.js.map