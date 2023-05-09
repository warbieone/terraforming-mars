"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedHabitats = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class ProtectedHabitats extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.PROTECTED_HABITATS,
            cost: 5,
            metadata: {
                cardNumber: '173',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.text('Opponents may not remove your', Size_1.Size.SMALL, true).br;
                    b.plants(1).animals(1).microbes(1);
                }),
            },
        });
    }
}
exports.ProtectedHabitats = ProtectedHabitats;
