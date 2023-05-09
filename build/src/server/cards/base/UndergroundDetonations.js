"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UndergroundDetonations = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class UndergroundDetonations extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.UNDERGROUND_DETONATIONS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 6,
            action: {
                spend: { megacredits: 10 },
                production: { heat: 2 },
            },
            metadata: {
                cardNumber: '202',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 10M€ to increase your heat production 2 steps.', (eb) => {
                        eb.megacredits(10).startAction.production((pb) => pb.heat(2));
                    });
                }),
            },
        });
    }
}
exports.UndergroundDetonations = UndergroundDetonations;
