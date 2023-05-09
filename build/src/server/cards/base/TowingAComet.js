"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TowingAComet = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class TowingAComet extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.TOWING_A_COMET,
            tags: [Tag_1.Tag.SPACE],
            cost: 23,
            behavior: {
                stock: { plants: 2 },
                global: { oxygen: 1 },
                ocean: {},
            },
            metadata: {
                cardNumber: '075',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oxygen(1).oceans(1).br;
                    b.plants(2);
                }),
                description: 'Gain 2 plants. Raise oxygen level 1 step and place an ocean tile.',
            },
        });
    }
}
exports.TowingAComet = TowingAComet;
