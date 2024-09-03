"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildColonyStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const BuildColony_1 = require("../../deferredActions/BuildColony");
class BuildColonyStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.BUILD_COLONY_STANDARD_PROJECT,
            cost: 17,
            metadata: {
                cardNumber: 'SP5',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 17 M€ to place a colony.', (eb) => {
                    eb.megacredits(17).startAction.colonies();
                })),
            },
        });
    }
    discount(player) {
        const adhaiDiscount = Math.floor(player.resourcesOnCard(CardName_1.CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS) / 2);
        return adhaiDiscount + super.discount(player);
    }
    canAct(player) {
        return super.canAct(player) && player.colonies.getPlayableColonies(false, this.cost).length > 0;
    }
    actionEssence(player) {
        player.game.defer(new BuildColony_1.BuildColony(player));
    }
}
exports.BuildColonyStandardProject = BuildColonyStandardProject;
