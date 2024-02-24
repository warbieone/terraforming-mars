"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeepLunarMining = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class DeepLunarMining extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DEEP_LUNAR_MINING,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON],
            cost: 18,
            reserveUnits: { titanium: 1 },
            behavior: {
                production: { titanium: 2 },
                moon: { miningRate: 1 },
            },
            metadata: {
                description: 'Spend 1 titanium. Increase your titanium production 2 steps. Raise the mining rate 1 step.',
                cardNumber: 'M18',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).production((pb) => {
                        pb.titanium(2);
                    }).br;
                    b.moonMiningRate();
                }),
            },
        });
    }
}
exports.DeepLunarMining = DeepLunarMining;
