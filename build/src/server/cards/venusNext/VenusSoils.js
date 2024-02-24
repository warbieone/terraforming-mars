"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusSoils = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class VenusSoils extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.VENUS_SOILS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS, Tag_1.Tag.PLANT],
            cost: 20,
            behavior: {
                production: { plants: 1 },
                global: { venus: 1 },
                addResourcesToAnyCard: { count: 2, type: CardResource_1.CardResource.MICROBE },
            },
            metadata: {
                cardNumber: '257',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1).br;
                    b.production((pb) => pb.plants(1)).microbes(2).asterix();
                }),
                description: 'Raise Venus 1 step. Increase your plant production 1 step. Add 2 microbes to ANOTHER card',
            },
        });
    }
}
exports.VenusSoils = VenusSoils;
