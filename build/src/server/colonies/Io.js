"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Io = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const Resource_1 = require("../../common/Resource");
class Io extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.IO,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            buildResource: Resource_1.Resource.HEAT,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [2, 3, 4, 6, 8, 10, 13],
            tradeResource: Resource_1.Resource.HEAT,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 2,
            colonyBonusResource: Resource_1.Resource.HEAT,
        });
    }
}
exports.Io = Io;
