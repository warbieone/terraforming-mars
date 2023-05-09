"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Europa = void 0;
const Colony_1 = require("./Colony");
const Resource_1 = require("../../common/Resource");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
class Europa extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.EUROPA,
            buildType: ColonyBenefit_1.ColonyBenefit.PLACE_OCEAN_TILE,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            tradeResource: [
                Resource_1.Resource.MEGACREDITS, Resource_1.Resource.MEGACREDITS,
                Resource_1.Resource.ENERGY, Resource_1.Resource.ENERGY,
                Resource_1.Resource.PLANTS, Resource_1.Resource.PLANTS, Resource_1.Resource.PLANTS,
            ],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
            shouldIncreaseTrack: 'ask',
        });
    }
}
exports.Europa = Europa;
