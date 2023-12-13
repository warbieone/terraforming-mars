"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solarnet = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class Solarnet extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SOLARNET,
            type: CardType_1.CardType.AUTOMATED,
            cost: 7,
            requirements: [{ tag: Tag_1.Tag.VENUS }, { tag: Tag_1.Tag.EARTH }, { tag: Tag_1.Tag.JOVIAN }],
            victoryPoints: 1,
            behavior: {
                drawCard: 2,
            },
            metadata: {
                cardNumber: '245',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2);
                }),
                description: 'Requires Venus, Earth and Jovian tags. Draw 2 cards.',
            },
        });
    }
}
exports.Solarnet = Solarnet;
//# sourceMappingURL=Solarnet.js.map