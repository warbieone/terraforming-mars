"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirScrappingStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const constants = require("../../../common/constants");
class AirScrappingStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor(properties = {
        name: CardName_1.CardName.AIR_SCRAPPING_STANDARD_PROJECT,
        cost: 15,
        tr: { venus: 1 },
        metadata: {
            cardNumber: 'SP1',
            renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 15 M€ to raise Venus 1 step.', (eb) => {
                eb.megacredits(15).startAction.venus(1);
            })),
        },
    }) {
        super(properties);
    }
    canAct(player) {
        if (player.game.getVenusScaleLevel() >= constants.MAX_VENUS_SCALE)
            return false;
        return super.canAct(player);
    }
    actionEssence(player) {
        player.game.increaseVenusScaleLevel(player, 1);
    }
}
exports.AirScrappingStandardProject = AirScrappingStandardProject;
