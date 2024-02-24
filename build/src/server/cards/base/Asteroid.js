"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Asteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 14,
            behavior: {
                stock: { titanium: 2 },
                global: { temperature: 1 },
                removeAnyPlants: 3,
            },
            metadata: {
                description: 'Raise temperature 1 step and gain 2 titanium. Remove up to 3 plants from any player.',
                cardNumber: '009',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(1).br;
                    b.titanium(2).br;
                    b.minus().plants(-3, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.Asteroid = Asteroid;
