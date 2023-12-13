"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeutralizerFactory = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class NeutralizerFactory extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.NEUTRALIZER_FACTORY,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.VENUS],
            cost: 7,
            behavior: {
                global: { venus: 1 },
            },
            requirements: { venus: 10 },
            metadata: {
                cardNumber: '240',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(1);
                }),
                description: 'Requires Venus 10%. Increase the Venus track 1 step.',
            },
        });
    }
}
exports.NeutralizerFactory = NeutralizerFactory;
//# sourceMappingURL=NeutralizerFactory.js.map