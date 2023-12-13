"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenusMagnetizer = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class VenusMagnetizer extends ActionCard_1.ActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.VENUS_MAGNETIZER,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 7,
            action: {
                production: { energy: -1 },
                global: { venus: 1 },
            },
            requirements: { venus: 10 },
            metadata: {
                cardNumber: '256',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Decrease your energy production 1 step to raise Venus 1 step.', (eb) => {
                        eb.production((pb) => pb.energy(1)).startAction.venus(1);
                    });
                }),
                description: 'Requires Venus 10%.',
            },
        });
    }
}
exports.VenusMagnetizer = VenusMagnetizer;
//# sourceMappingURL=VenusMagnetizer.js.map