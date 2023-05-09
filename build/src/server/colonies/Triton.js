"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triton = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../common/Resource");
class Triton extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.TRITON,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            buildQuantity: [3, 3, 3],
            buildResource: Resource_1.Resource.TITANIUM,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [0, 1, 1, 2, 3, 4, 5],
            tradeResource: Resource_1.Resource.TITANIUM,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusResource: Resource_1.Resource.TITANIUM,
        });
    }
}
exports.Triton = Triton;
