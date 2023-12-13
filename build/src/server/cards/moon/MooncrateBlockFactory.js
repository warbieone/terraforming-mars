"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MooncrateBlockFactory = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class MooncrateBlockFactory extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MOONCRATE_BLOCK_FACTORY,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.BUILDING],
            cost: 8,
            requirements: { miningTiles: 1 },
            metadata: {
                description: 'Requires 1 mine on The Moon.',
                cardNumber: 'M38',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('When you pay for a Lunar standard project, you spend 4M€ less.', (eb) => {
                        eb.plate('Lunar standard projects').startEffect.megacredits(-4);
                    });
                }),
            },
        });
    }
}
exports.MooncrateBlockFactory = MooncrateBlockFactory;
//# sourceMappingURL=MooncrateBlockFactory.js.map