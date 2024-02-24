"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Windmills = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class Windmills extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.WINDMILLS,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 6,
            behavior: {
                production: { energy: 1 },
            },
            victoryPoints: 1,
            requirements: { oxygen: 7 },
            metadata: {
                cardNumber: '168',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1));
                }),
                description: 'Requires 7% oxygen. Increase your energy production 1 step.',
            },
        });
    }
}
exports.Windmills = Windmills;
