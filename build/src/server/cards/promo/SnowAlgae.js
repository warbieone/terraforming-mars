"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnowAlgae = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SnowAlgae extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SNOW_ALGAE,
            cost: 11,
            tags: [Tag_1.Tag.PLANT],
            behavior: {
                production: { plants: 1, heat: 1 },
            },
            requirements: { oceans: 2 },
            metadata: {
                cardNumber: '211',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.plants(1).heat(1);
                    });
                }),
                description: 'Requires 2 oceans. Increase your plant production and your heat production 1 step each.',
            },
        });
    }
}
exports.SnowAlgae = SnowAlgae;
