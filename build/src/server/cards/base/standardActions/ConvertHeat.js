"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertHeat = void 0;
const StandardActionCard_1 = require("../../StandardActionCard");
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const constants_1 = require("../../../../common/constants");
const Units_1 = require("../../../../common/Units");
class ConvertHeat extends StandardActionCard_1.StandardActionCard {
    constructor() {
        super({
            name: CardName_1.CardName.CONVERT_HEAT,
            metadata: {
                cardNumber: 'SA2',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 8 heat to raise temperature 1 step.', (eb) => {
                    eb.heat(8).startAction.temperature(1);
                })),
            },
        });
    }
    canAct(player) {
        if (player.game.getTemperature() === constants_1.MAX_TEMPERATURE) {
            return false;
        }
        if (player.availableHeat() < constants_1.HEAT_FOR_TEMPERATURE) {
            return false;
        }
        return player.canAfford(0, {
            tr: { temperature: 1 },
            reserveUnits: Units_1.Units.of({ heat: 8 }),
        });
    }
    action(player) {
        return player.spendHeat(constants_1.HEAT_FOR_TEMPERATURE, () => {
            this.actionUsed(player);
            player.game.increaseTemperature(player, 1);
            return undefined;
        });
    }
}
exports.ConvertHeat = ConvertHeat;
