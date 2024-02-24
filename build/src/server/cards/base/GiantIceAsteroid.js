"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiantIceAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class GiantIceAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.GIANT_ICE_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 36,
            tr: { temperature: 2, oceans: 2 },
            behavior: {
                global: { temperature: 2 },
                removeAnyPlants: 6,
                ocean: { count: 2 },
            },
            metadata: {
                description: 'Raise temperature 2 steps and place 2 ocean tiles. Remove up to 6 plants from any player.',
                cardNumber: '080',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(2).br;
                    b.oceans(2).br;
                    b.minus().plants(-6, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.GiantIceAsteroid = GiantIceAsteroid;
