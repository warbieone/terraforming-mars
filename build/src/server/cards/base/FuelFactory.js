"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelFactory = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class FuelFactory extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FUEL_FACTORY,
            tags: [Tag_1.Tag.BUILDING],
            cost: 6,
            behavior: {
                production: { energy: -1, megacredits: 1, titanium: 1 },
            },
            metadata: {
                cardNumber: '180',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().titanium(1).megacredits(1);
                    });
                }),
                description: 'Decrease your energy production 1 step and increase your titanium and your M€ production 1 step each.',
            },
        });
    }
}
exports.FuelFactory = FuelFactory;
