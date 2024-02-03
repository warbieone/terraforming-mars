"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidStandardProject = void 0;
const constants = require("../../../../common/constants");
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
class AsteroidStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.ASTEROID_STANDARD_PROJECT,
            cost: 14,
            tr: { temperature: 1 },
            metadata: {
                cardNumber: 'SP9',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 14 M€ to raise the temperature 1 step.', (eb) => {
                    eb.megacredits(14).startAction.temperature(1);
                })),
            },
        });
    }
    canPayWith(player) {
        if (player.isCorporation(CardName_1.CardName.KUIPER_COOPERATIVE)) {
            return { kuiperAsteroids: true };
        }
        else {
            return {};
        }
    }
    canAct(player) {
        if (player.game.getTemperature() >= constants.MAX_TEMPERATURE) {
            this.warnings.add('maxtemp');
        }
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.increaseTemperature(player, 1);
    }
}
exports.AsteroidStandardProject = AsteroidStandardProject;
//# sourceMappingURL=AsteroidStandardProject.js.map