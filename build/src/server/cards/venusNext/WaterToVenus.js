"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaterToVenus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class WaterToVenus extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.WATER_TO_VENUS,
            type: CardType_1.CardType.EVENT,
            tags: [Tag_1.Tag.SPACE],
            cost: 9,
            behavior: {
                global: { venus: 1 },
            },
            metadata: {
                cardNumber: '254',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.venus(1)),
                description: 'Raise Venus 1 step.',
            },
        });
    }
}
exports.WaterToVenus = WaterToVenus;
