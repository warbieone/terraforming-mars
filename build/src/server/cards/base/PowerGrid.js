"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerGrid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class PowerGrid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.POWER_GRID,
            tags: [Tag_1.Tag.POWER],
            cost: 18,
            behavior: {
                production: { energy: { tag: Tag_1.Tag.POWER } },
            },
            metadata: {
                cardNumber: '102',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).slash().energy(1, { played: Options_1.played }));
                }),
                description: 'Increase your energy production step for each power tag you have, including this.',
            },
        });
    }
}
exports.PowerGrid = PowerGrid;
