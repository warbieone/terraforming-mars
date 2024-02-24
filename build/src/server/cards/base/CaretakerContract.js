"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaretakerContract = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const ActionCard_1 = require("../ActionCard");
class CaretakerContract extends ActionCard_1.ActionCard {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.CARETAKER_CONTRACT,
            cost: 3,
            requirements: { temperature: 0 },
            action: {
                spend: { heat: 8 },
                tr: 1,
            },
            metadata: {
                cardNumber: '154',
                description: 'Requires 0° C or warmer.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 8 heat to increase your terraform rating 1 step.', (eb) => {
                        eb.heat(8).startAction.tr(1);
                    });
                }),
            },
        });
    }
}
exports.CaretakerContract = CaretakerContract;
