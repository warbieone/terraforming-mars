"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpacePort = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class SpacePort extends Card_1.Card {
    constructor() {
        super({
            cost: 22,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.BUILDING],
            name: CardName_1.CardName.SPACE_PORT,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { energy: -1, megacredits: 4 },
                colonies: { addTradeFleet: 1 },
                city: {},
            },
            requirements: { colonies: 1 },
            metadata: {
                cardNumber: 'C39',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().megacredits(4);
                    }).nbsp.city().br;
                    b.tradeFleet();
                }),
                description: 'Requires 1 colony. Decrease your energy production 1 step and increase your M€ production 4 steps. Place a city tile. Gain 1 Trade Fleet.',
            },
        });
    }
}
exports.SpacePort = SpacePort;
