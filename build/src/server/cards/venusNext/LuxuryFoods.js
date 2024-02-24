"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LuxuryFoods = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
class LuxuryFoods extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUXURY_FOODS,
            type: CardType_1.CardType.AUTOMATED,
            cost: 8,
            victoryPoints: 2,
            requirements: [{ tag: Tag_1.Tag.VENUS }, { tag: Tag_1.Tag.EARTH }, { tag: Tag_1.Tag.JOVIAN }],
            metadata: {
                description: 'Requires that you have a Venus tag, an Earth tag and a Jovian tag.',
                cardNumber: 'T10',
            },
        });
    }
    bespokeCanPlay(player) {
        return player.tags.playerHas([Tag_1.Tag.VENUS, Tag_1.Tag.EARTH, Tag_1.Tag.JOVIAN]);
    }
}
exports.LuxuryFoods = LuxuryFoods;
