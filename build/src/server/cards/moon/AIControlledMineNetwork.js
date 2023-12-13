"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIControlledMineNetwork = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class AIControlledMineNetwork extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.AI_CONTROLLED_MINE_NETWORK,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 6,
            behavior: {
                moon: { logisticsRate: 1 },
            },
            requirements: { logisticRate: 2 },
            metadata: {
                description: 'Requires the logistic rate to be 2 or higher. Raise the logistic rate 1 step',
                cardNumber: 'M32',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonLogisticsRate();
                }),
            },
        });
    }
}
exports.AIControlledMineNetwork = AIControlledMineNetwork;
//# sourceMappingURL=AIControlledMineNetwork.js.map