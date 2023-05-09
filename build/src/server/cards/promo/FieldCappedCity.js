"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldCappedCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class FieldCappedCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.FIELD_CAPPED_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING, Tag_1.Tag.POWER],
            cost: 29,
            behavior: {
                production: { energy: 1, megacredits: 2 },
                stock: { plants: 3 },
                city: {},
            },
            metadata: {
                cardNumber: 'X21',
                description: 'Increase your M€ production 2 steps, increase your energy production 1 step, gain 3 plants, and place a city tile.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(2).br;
                        pb.energy(1);
                    }).nbsp.city().br;
                    b.plants(3);
                }),
            },
        });
    }
}
exports.FieldCappedCity = FieldCappedCity;
