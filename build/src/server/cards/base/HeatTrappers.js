"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeatTrappers = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class HeatTrappers extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.HEAT_TRAPPERS,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 6,
            victoryPoints: -1,
            behavior: {
                decreaseAnyProduction: { type: Resource_1.Resource.HEAT, count: 2 },
                production: { energy: 1 },
            },
            metadata: {
                cardNumber: '178',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().heat(2, { all: Options_1.all }).br;
                        pb.plus().energy(1);
                    });
                }),
                description: 'Decrease any heat production 2 steps and increase your energy production 1 step.',
            },
        });
    }
}
exports.HeatTrappers = HeatTrappers;
