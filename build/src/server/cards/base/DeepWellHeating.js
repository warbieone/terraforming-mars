"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepWellHeating = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class DeepWellHeating extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.DEEP_WELL_HEATING,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 13,
            behavior: {
                production: { energy: 1 },
                global: { temperature: 1 },
            },
            metadata: {
                cardNumber: '003',
                description: 'Increase your energy production 1 step. Increase temperature 1 step.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1)).temperature(1);
                }),
            },
        });
    }
}
exports.DeepWellHeating = DeepWellHeating;
