"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ceres = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../common/Resource");
class Ceres extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.CERES,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            buildResource: Resource_1.Resource.STEEL,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [1, 2, 3, 4, 6, 8, 10],
            tradeResource: Resource_1.Resource.STEEL,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 2,
            colonyBonusResource: Resource_1.Resource.STEEL,
        });
    }
}
exports.Ceres = Ceres;
