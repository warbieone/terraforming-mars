"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpinInducingAsteroid = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
class SpinInducingAsteroid extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SPIN_INDUCING_ASTEROID,
            cost: 16,
            tags: [Tag_1.Tag.SPACE],
            behavior: {
                global: { venus: 2 },
            },
            requirements: { venus: 10, max: Options_1.max },
            metadata: {
                cardNumber: '246',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.venus(2);
                }),
                description: 'Venus must be 10% or lower. Raise Venus 2 steps.',
            },
        });
    }
}
exports.SpinInducingAsteroid = SpinInducingAsteroid;
//# sourceMappingURL=SpinInducingAsteroid.js.map