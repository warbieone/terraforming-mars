"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudSeeding = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const Tag_1 = require("../../../common/cards/Tag");
class CloudSeeding extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.CLOUD_SEEDING,
            tags: [Tag_1.Tag.PLANT],
            cost: 11,
            behavior: {
                production: { megacredits: -1, plants: 2 },
                decreaseAnyProduction: { type: Resource_1.Resource.HEAT, count: 1 },
            },
            requirements: { oceans: 3 },
            metadata: {
                cardNumber: '004',
                description: 'Requires 3 ocean tiles. Decrease your M€ production 1 step and any heat production 1 step. Increase your plant production 2 steps.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.production((pb) => {
                    pb.minus().megacredits(1).heat(1, { all: Options_1.all }).br;
                    pb.plus().plants(2);
                })),
            },
        });
    }
}
exports.CloudSeeding = CloudSeeding;
