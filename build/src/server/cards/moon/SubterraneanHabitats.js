"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubterraneanHabitats = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SubterraneanHabitats extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SUBTERRANEAN_HABITATS,
            type: CardType_1.CardType.ACTIVE,
            cost: 12,
            reserveUnits: { steel: 2 },
            behavior: {
                moon: { habitatRate: 1 },
            },
            metadata: {
                description: 'Spend 2 steel. Raise the habitat rate 1 step.',
                cardNumber: 'M36',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you build a habitat on The Moon, you spend 1 titanium less.', (eb) => {
                        eb.startEffect.moonHabitat().colon().minus().titanium(1);
                    });
                    b.br;
                    b.minus().steel(2).moonHabitatRate();
                }),
            },
        });
    }
}
exports.SubterraneanHabitats = SubterraneanHabitats;
