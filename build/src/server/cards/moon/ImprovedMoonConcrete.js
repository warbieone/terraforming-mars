"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImprovedMoonConcrete = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class ImprovedMoonConcrete extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.IMPROVED_MOON_CONCRETE,
            type: CardType_1.CardType.ACTIVE,
            cost: 12,
            reserveUnits: { steel: 2 },
            behavior: {
                moon: { miningRate: 1 },
            },
            metadata: {
                description: 'Spend 2 steel. Raise the mining rate 1 step.',
                cardNumber: 'M37',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you build a mine on The Moon, you spend 1 titanium less.', (eb) => {
                        eb.moonMine().startEffect.minus().titanium(1);
                    }).br;
                    b.minus().steel(2).moonMiningRate();
                }),
            },
        });
    }
}
exports.ImprovedMoonConcrete = ImprovedMoonConcrete;
