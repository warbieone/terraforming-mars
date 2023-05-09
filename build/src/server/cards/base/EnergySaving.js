"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergySaving = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardName_1 = require("../../../common/cards/CardName");
const Size_1 = require("../../../common/cards/render/Size");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class EnergySaving extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ENERGY_SAVING,
            tags: [Tag_1.Tag.POWER],
            cost: 15,
            behavior: {
                production: { energy: { cities: {} } },
            },
            metadata: {
                cardNumber: '189',
                description: 'Increase your energy production 1 step for each city tile in play.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.energy(1).slash().city({ size: Size_1.Size.SMALL, all: Options_1.all }));
                }),
            },
        });
    }
}
exports.EnergySaving = EnergySaving;
