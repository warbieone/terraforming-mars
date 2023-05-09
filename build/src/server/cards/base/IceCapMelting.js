"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IceCapMelting = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
class IceCapMelting extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.ICE_CAP_MELTING,
            cost: 5,
            behavior: {
                ocean: {},
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(2)),
            metadata: {
                cardNumber: '181',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.oceans(1)),
                description: 'Requires +2 C or warmer. Place 1 ocean tile.',
            },
        });
    }
}
exports.IceCapMelting = IceCapMelting;
