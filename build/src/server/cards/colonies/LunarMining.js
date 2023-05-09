"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarMining = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class LunarMining extends Card_1.Card {
    constructor() {
        super({
            cost: 11,
            tags: [Tag_1.Tag.EARTH],
            name: CardName_1.CardName.LUNAR_MINING,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { titanium: { tag: Tag_1.Tag.EARTH, per: 2 } },
            },
            metadata: {
                cardNumber: 'C22',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.titanium(1).slash().earth(2, { played: Options_1.played });
                    });
                }),
                description: 'Increase your titanium production 1 step for every 2 Earth tags you have in play, including this.',
            },
        });
    }
}
exports.LunarMining = LunarMining;
