"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaretakerContract = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../requirements/CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Units_1 = require("../../../common/Units");
class CaretakerContract extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.CARETAKER_CONTRACT,
            cost: 3,
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.temperature(0)),
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
    canAct(player) {
        return player.availableHeat() >= 8 && player.canAfford(0, {
            reserveUnits: Units_1.Units.of({ heat: 8 }),
            tr: { tr: 1 },
        });
    }
    action(player) {
        return player.spendHeat(8, () => {
            player.increaseTerraformRating();
            return undefined;
        });
    }
}
exports.CaretakerContract = CaretakerContract;
//# sourceMappingURL=CaretakerContract.js.map