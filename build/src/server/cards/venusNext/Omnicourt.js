"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Omnicourt = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class Omnicourt extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.OMNICOURT,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.BUILDING],
            cost: 11,
            behavior: {
                tr: 2,
            },
            requirements: [{ tag: Tag_1.Tag.VENUS }, { tag: Tag_1.Tag.EARTH }, { tag: Tag_1.Tag.JOVIAN }],
            metadata: {
                cardNumber: '241',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.tr(2);
                }),
                description: 'Requires Venus, Earth and Jovian tags. Increase your TR 2 steps.',
            },
        });
    }
}
exports.Omnicourt = Omnicourt;
