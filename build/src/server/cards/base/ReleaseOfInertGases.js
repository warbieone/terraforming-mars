"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleaseOfInertGases = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class ReleaseOfInertGases extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.RELEASE_OF_INERT_GASES,
            cost: 14,
            behavior: {
                tr: 2,
            },
            metadata: {
                cardNumber: '036',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(2);
                }),
                description: 'Raise your terraforming rating 2 steps.',
            },
        });
    }
}
exports.ReleaseOfInertGases = ReleaseOfInertGases;
