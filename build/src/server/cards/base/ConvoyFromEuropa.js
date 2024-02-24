"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvoyFromEuropa = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ConvoyFromEuropa extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.CONVOY_FROM_EUROPA,
            tags: [Tag_1.Tag.SPACE],
            cost: 15,
            behavior: {
                ocean: {},
                drawCard: 1,
            },
            metadata: {
                cardNumber: '161',
                description: 'Place 1 ocean tile and draw 1 card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.oceans(1).cards(1)),
            },
        });
    }
}
exports.ConvoyFromEuropa = ConvoyFromEuropa;
