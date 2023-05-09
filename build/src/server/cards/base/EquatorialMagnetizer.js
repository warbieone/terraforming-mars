"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquatorialMagnetizer = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const ActionCard_1 = require("../ActionCard");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class EquatorialMagnetizer extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.EQUATORIAL_MAGNETIZER,
            tags: [Tag_1.Tag.BUILDING],
            cost: 11,
            action: {
                production: { energy: -1 },
                tr: 1,
            },
            metadata: {
                cardNumber: '015',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Decrease your energy production 1 step to increase your terraform rating 1 step.', (eb) => {
                        eb.production((pb) => pb.energy(1)).startAction.tr(1);
                    });
                }),
            },
        });
    }
}
exports.EquatorialMagnetizer = EquatorialMagnetizer;
