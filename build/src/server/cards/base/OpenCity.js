"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenCity = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class OpenCity extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.OPEN_CITY,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            cost: 23,
            requirements: { oxygen: 12 },
            victoryPoints: 1,
            behavior: {
                production: { energy: -1, megacredits: 4 },
                stock: { plants: 2 },
                city: {},
            },
            metadata: {
                cardNumber: '108',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(4);
                    }).city().plants(2);
                }),
                description: {
                    text: 'Requires 12% oxygen. Gain 2 plants. Place a city tile. Decrease your energy production 1 step and increase your M€ production 4 steps.',
                    align: 'left',
                },
            },
        });
    }
}
exports.OpenCity = OpenCity;
//# sourceMappingURL=OpenCity.js.map