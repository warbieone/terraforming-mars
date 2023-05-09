"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const constants = require("../../../../common/constants");
class AsteroidStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.ASTEROID_STANDARD_PROJECT,
            cost: 14,
            tr: { temperature: 1 },
            metadata: {
                cardNumber: 'SP9',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 14 M€ to raise temperature 1 step.', (eb) => {
                    eb.megacredits(14).startAction.temperature(1);
                })),
            },
        });
    }
    canAct(player) {
        if (player.game.getTemperature() === constants.MAX_TEMPERATURE) {
            return false;
        }
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.increaseTemperature(player, 1);
    }
}
exports.AsteroidStandardProject = AsteroidStandardProject;
