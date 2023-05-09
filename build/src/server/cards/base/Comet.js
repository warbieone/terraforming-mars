"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comet = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class Comet extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.COMET,
            tags: [Tag_1.Tag.SPACE],
            cost: 21,
            behavior: {
                global: { temperature: 1 },
                ocean: {},
                removeAnyPlants: 3,
            },
            metadata: {
                cardNumber: '010',
                description: 'Raise temperature 1 step and place an ocean tile. Remove up to 3 plants from any player.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.temperature(1).oceans(1).br;
                    b.minus().plants(-3, { all: Options_1.all });
                }),
            },
        });
    }
}
exports.Comet = Comet;
