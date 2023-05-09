"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callisto = void 0;
const Colony_1 = require("./Colony");
const Resource_1 = require("../../common/Resource");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
class Callisto extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.CALLISTO,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            buildResource: Resource_1.Resource.ENERGY,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [0, 2, 3, 5, 7, 10, 13],
            tradeResource: Resource_1.Resource.ENERGY,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 3,
            colonyBonusResource: Resource_1.Resource.ENERGY,
        });
    }
}
exports.Callisto = Callisto;
