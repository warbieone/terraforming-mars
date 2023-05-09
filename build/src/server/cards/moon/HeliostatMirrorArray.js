"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeliostatMirrorArray = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class HeliostatMirrorArray extends Card_1.Card {
    constructor() {
        super({
            cost: 10,
            tags: [Tag_1.Tag.POWER],
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HELIOSTAT_MIRROR_ARRAY,
            behavior: {
                production: { energy: 2 },
                stock: { heat: 1 },
            },
            reserveUnits: { titanium: 1 },
            metadata: {
                description: 'Spend 1 titanium. Gain 1 heat. Increase your energy production 2 steps.',
                cardNumber: 'M41',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).heat(1);
                    b.br;
                    b.production((pb) => pb.energy(2));
                }),
            },
        });
    }
}
exports.HeliostatMirrorArray = HeliostatMirrorArray;
