"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolarWindPower = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SolarWindPower extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.SOLAR_WIND_POWER,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.SPACE, Tag_1.Tag.POWER],
            cost: 11,
            behavior: {
                production: { energy: 1 },
                stock: { titanium: 2 },
            },
            metadata: {
                cardNumber: '077',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).br.titanium(2);
                }),
                description: 'Increase your energy production 1 step and gain 2 titanium.',
            },
        });
    }
}
exports.SolarWindPower = SolarWindPower;
