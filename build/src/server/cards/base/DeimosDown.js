"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeimosDown = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class DeimosDown extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.DEIMOS_DOWN,
            tags: [Tag_1.Tag.SPACE],
            cost: 31,
            behavior: {
                stock: { steel: 4 },
                global: { temperature: 3 },
                removeAnyPlants: 8,
            },
            metadata: {
                cardNumber: '039',
                description: 'Raise temperature 3 steps and gain 4 steel. Remove up to 8 plants from any player.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(3).br;
                    b.steel(4).br;
                    b.minus().plants(-8, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.DeimosDown = DeimosDown;
