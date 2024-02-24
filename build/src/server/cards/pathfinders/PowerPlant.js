"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerPlant = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
class PowerPlant extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.POWER_PLANT_PATHFINDERS,
            cost: 13,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            behavior: {
                production: { heat: 2, energy: 1 },
            },
            metadata: {
                cardNumber: 'Pf20',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production(((pb) => pb.heat(2).energy(1)));
                }),
                description: 'Increase your heat production 2 steps and your energy production 1 step.',
            },
        });
    }
}
exports.PowerPlant = PowerPlant;
