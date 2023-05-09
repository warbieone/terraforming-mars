"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hygiea = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../../common/Resource");
class Hygiea extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.HYGIEA,
            buildType: ColonyBenefit_1.ColonyBenefit.OPPONENT_DISCARD,
            tradeType: ColonyBenefit_1.ColonyBenefit.STEAL_RESOURCES,
            tradeQuantity: [3, 3, 3, 3, 3, 3, 3],
            tradeResource: [
                Resource_1.Resource.MEGACREDITS,
                Resource_1.Resource.MEGACREDITS,
                Resource_1.Resource.HEAT,
                Resource_1.Resource.ENERGY,
                Resource_1.Resource.PLANTS,
                Resource_1.Resource.STEEL,
                Resource_1.Resource.TITANIUM,
            ],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 3,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
            shouldIncreaseTrack: 'ask',
        });
    }
}
exports.Hygiea = Hygiea;
