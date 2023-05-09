"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Luna = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../common/Resource");
class Luna extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.LUNA,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            buildQuantity: [2, 2, 2],
            buildResource: Resource_1.Resource.MEGACREDITS,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [1, 2, 4, 7, 10, 13, 17],
            tradeResource: Resource_1.Resource.MEGACREDITS,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 2,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
        });
    }
}
exports.Luna = Luna;
