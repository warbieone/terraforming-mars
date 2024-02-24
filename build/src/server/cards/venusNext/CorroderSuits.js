"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorroderSuits = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class CorroderSuits extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.CORRODER_SUITS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS],
            cost: 8,
            behavior: {
                production: { megacredits: 2 },
                addResourcesToAnyCard: { count: 1, tag: Tag_1.Tag.VENUS },
            },
            metadata: {
                cardNumber: '219',
                description: 'Increase your M€ production 2 steps. Add 1 resource to ANY Venus CARD.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.megacredits(2);
                    }).wild(1, { secondaryTag: Tag_1.Tag.VENUS });
                }),
            },
        });
    }
}
exports.CorroderSuits = CorroderSuits;
