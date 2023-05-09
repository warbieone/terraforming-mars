"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterplanetaryColonyShip = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
class InterplanetaryColonyShip extends Card_1.Card {
    constructor() {
        super({
            cost: 12,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.EARTH],
            name: CardName_1.CardName.INTERPLANETARY_COLONY_SHIP,
            type: CardType_1.CardType.EVENT,
            behavior: {
                colonies: { buildColony: {} },
            },
            metadata: {
                cardNumber: 'C17',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.colonies(1)),
                description: 'Place a colony.',
            },
        });
    }
}
exports.InterplanetaryColonyShip = InterplanetaryColonyShip;
