"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperimentalForest = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("./PreludeCard");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ExperimentalForest extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.EXPERIMENTAL_FOREST,
            tags: [Tag_1.Tag.PLANT],
            behavior: {
                drawCard: { count: 2, tag: Tag_1.Tag.PLANT },
                greenery: {},
            },
            metadata: {
                cardNumber: 'P12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.greenery().cards(2, { secondaryTag: Tag_1.Tag.PLANT });
                }),
                description: 'Place 1 greenery tile and raise oxygen 1 step. Reveal cards until you reveal two cards with plant tags on them. Take them into your hand and discard the rest.',
            },
        });
    }
}
exports.ExperimentalForest = ExperimentalForest;
