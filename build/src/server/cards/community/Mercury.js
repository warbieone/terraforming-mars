"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mercury = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../../common/Resource");
class Mercury extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.MERCURY,
            buildType: ColonyBenefit_1.ColonyBenefit.COPY_TRADE,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            tradeResource: [
                Resource_1.Resource.HEAT, Resource_1.Resource.HEAT, Resource_1.Resource.HEAT,
                Resource_1.Resource.STEEL, Resource_1.Resource.STEEL,
                Resource_1.Resource.TITANIUM, Resource_1.Resource.TITANIUM,
            ],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
            colonyBonusQuantity: 2,
            shouldIncreaseTrack: 'ask',
        });
    }
}
exports.Mercury = Mercury;
