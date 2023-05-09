"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BigAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../../cards/render/CardRenderer");
const Options_1 = require("../Options");
class BigAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.BIG_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 27,
            behavior: {
                stock: { titanium: 4 },
                global: { temperature: 2 },
                removeAnyPlants: 4,
            },
            metadata: {
                description: 'Raise temperature 2 steps and gain 4 titanium. Remove up to 4 plants from any player.',
                cardNumber: '011',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(2).br;
                    b.titanium(4).br;
                    b.minus().plants(-4, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.BigAsteroid = BigAsteroid;
