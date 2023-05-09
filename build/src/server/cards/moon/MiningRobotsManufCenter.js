"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningRobotsManufCenter = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class MiningRobotsManufCenter extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MINING_ROBOTS_MANUF_CENTER,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SCIENCE, Tag_1.Tag.BUILDING],
            cost: 12,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { miningRate: 2 },
            },
            metadata: {
                description: 'Spend 1 titanium. Raise the mining rate 2 steps.',
                cardNumber: 'M23',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).br;
                    b.moonMiningRate({ amount: 2 });
                }),
            },
        });
    }
}
exports.MiningRobotsManufCenter = MiningRobotsManufCenter;
