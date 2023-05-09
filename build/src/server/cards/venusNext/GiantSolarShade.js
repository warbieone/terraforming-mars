"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiantSolarShade = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class GiantSolarShade extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.GIANT_SOLAR_SHADE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.VENUS],
            cost: 27,
            behavior: {
                global: { venus: 3 },
            },
            metadata: {
                cardNumber: '229',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.venus(3)),
                description: 'Raise Venus 3 steps.',
            },
        });
    }
}
exports.GiantSolarShade = GiantSolarShade;
