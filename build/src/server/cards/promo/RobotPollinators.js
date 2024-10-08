"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotPollinators = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class RobotPollinators extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ROBOT_POLLINATORS,
            cost: 9,
            requirements: { oxygen: 4 },
            behavior: {
                production: { plants: 1 },
                stock: { plants: { tag: Tag_1.Tag.PLANT } },
            },
            metadata: {
                cardNumber: 'X45',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.plants(1)).br.plants(1).slash().tag(Tag_1.Tag.PLANT);
                }),
                description: 'Requires 4% oxygen. Increase your plant production 1 step. Gain 1 plant for every plant tag you have.',
            },
        });
    }
}
exports.RobotPollinators = RobotPollinators;
