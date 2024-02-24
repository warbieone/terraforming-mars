"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarReflectors = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SolarReflectors extends Card_1.Card {
    constructor() {
        super({
            cost: 23,
            tags: [Tag_1.Tag.SPACE],
            name: CardName_1.CardName.SOLAR_REFLECTORS,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { heat: 5 },
            },
            metadata: {
                cardNumber: 'C38',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.heat(5, { digit: Options_1.digit }));
                }),
                description: 'Increase your heat production 5 steps.',
            },
        });
    }
}
exports.SolarReflectors = SolarReflectors;
