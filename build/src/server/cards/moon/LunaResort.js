"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunaResort = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class LunaResort extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNA_RESORT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 11,
            reserveUnits: { titanium: 2 },
            behavior: {
                production: { energy: -1, megacredits: 3 },
                moon: { habitatRate: 1 },
            },
            requirements: { habitatTiles: 2, all: Options_1.all },
            metadata: {
                description: 'Requires 2 habitats on The Moon. Spend 2 titanium. Decrease your energy production 1 step and increase your M€ production 3 steps. Raise the habitat rate 1 step.',
                cardNumber: 'M21',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(2).production((pb) => {
                        pb.minus().energy(1).nbsp.plus().megacredits(3);
                    }).br;
                    b.moonHabitatRate();
                }),
            },
        });
    }
}
exports.LunaResort = LunaResort;
//# sourceMappingURL=LunaResort.js.map