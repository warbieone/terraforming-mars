"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LTFHeadquarters = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class LTFHeadquarters extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LTF_HEADQUARTERS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SPACE],
            cost: 31,
            behavior: {
                moon: { habitatRate: 1 },
                colonies: {
                    buildColony: {},
                    addTradeFleet: 1,
                },
            },
            metadata: {
                description: 'Raise the habitat rate 1 step. Place a colony. Gain 1 Trade Fleet.',
                cardNumber: 'M79',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.moonHabitatRate().colonies(1).tradeFleet();
                }),
            },
        });
    }
}
exports.LTFHeadquarters = LTFHeadquarters;
