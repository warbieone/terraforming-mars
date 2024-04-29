"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildColonyStandardProject = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const StandardProjectCard_1 = require("../StandardProjectCard");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
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
    getOpenColonies(player) {
        let openColonies = player.game.colonies.filter((colony) => !colony.isFull() &&
            colony.colonies.includes(player.id) === false &&
            colony.isActive);
        const canAffordVenus = player.canAfford({ cost: this.cost, tr: { venus: 1 } });
        if (!canAffordVenus) {
            openColonies = openColonies.filter((colony) => colony.name !== ColonyName_1.ColonyName.VENUS);
        }
        return openColonies;
    }
    canAct(player) {
        return super.canAct(player) && this.getOpenColonies(player).length > 0;
    }
    actionEssence(player) {
        player.game.defer(new BuildColony_1.BuildColony(player));
    }
}
exports.BuildColonyStandardProject = BuildColonyStandardProject;
