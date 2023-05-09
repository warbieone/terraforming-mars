"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackPolarDust = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class BlackPolarDust extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.BLACK_POLAR_DUST,
            cost: 15,
            behavior: {
                ocean: {},
                production: { megacredits: -2, heat: 3 },
            },
            metadata: {
                cardNumber: '022',
                description: 'Place an ocean tile. Decrease your M€ production 2 steps and increase your heat production 3 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().megacredits(2).br;
                        pb.plus().heat(3);
                    }).oceans(1);
                }),
            },
        });
    }
}
exports.BlackPolarDust = BlackPolarDust;
