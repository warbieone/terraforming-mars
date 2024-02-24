"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IceAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class IceAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.ICE_ASTEROID,
            tags: [Tag_1.Tag.SPACE],
            cost: 23,
            tr: { oceans: 2 },
            behavior: {
                ocean: { count: 2 },
            },
            metadata: {
                cardNumber: '078',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.oceans(2)),
                description: 'Place 2 ocean tiles.',
            },
        });
    }
}
exports.IceAsteroid = IceAsteroid;
