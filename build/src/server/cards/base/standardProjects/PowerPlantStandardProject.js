"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerPlantStandardProject = void 0;
const CardName_1 = require("../../../../common/cards/CardName");
const CardRenderer_1 = require("../../render/CardRenderer");
const StandardProjectCard_1 = require("../../StandardProjectCard");
const Resource_1 = require("../../../../common/Resource");
class PowerPlantStandardProject extends StandardProjectCard_1.StandardProjectCard {
    constructor() {
        super({
            name: CardName_1.CardName.POWER_PLANT_STANDARD_PROJECT,
            cost: 11,
            metadata: {
                cardNumber: 'SP7',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.standardProject('Spend 11 M€ to increase your energy production 1 step.', (eb) => {
                    eb.megacredits(11).startAction.production((pb) => {
                        pb.energy(1);
                    });
                })),
            },
        });
    }
    discount(player) {
        let discount = 0;
        if (player.isCorporation(CardName_1.CardName.THORGATE)) {
            discount += 3;
        }
        if (player.cardIsInEffect(CardName_1.CardName.HIGH_TEMP_SUPERCONDUCTORS)) {
            discount += 3;
        }
        return discount;
    }
    actionEssence(player) {
        player.production.add(Resource_1.Resource.ENERGY, 1);
    }
}
exports.PowerPlantStandardProject = PowerPlantStandardProject;
