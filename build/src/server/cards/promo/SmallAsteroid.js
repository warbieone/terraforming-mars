"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallAsteroid = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class SmallAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SMALL_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 10,
            behavior: {
                global: { temperature: 1 },
                removeAnyPlants: 2,
            },
            metadata: {
                cardNumber: '209',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(1).br;
                    b.minus().plants(2, { all: Options_1.all });
                }),
                description: 'Increase temperature 1 step. Remove up to 2 plants from any player.',
            },
        });
    }
}
exports.SmallAsteroid = SmallAsteroid;
