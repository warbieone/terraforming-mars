"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CopernicusSolarArrays = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class CopernicusSolarArrays extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.COPERNICUS_SOLAR_ARRAYS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.SPACE],
            cost: 8,
            reserveUnits: { titanium: 1 },
            behavior: {
                production: { energy: 1 },
                stock: { heat: 2 },
            },
            metadata: {
                description: 'Spend 1 titanium. Gain 2 heat. Incease your energy production 1 step.',
                cardNumber: 'M44',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1);
                    b.br;
                    b.heat(2);
                    b.br;
                    b.production((pb) => pb.energy(1));
                }),
            },
        });
    }
}
exports.CopernicusSolarArrays = CopernicusSolarArrays;
