"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ganymede = void 0;
const Colony_1 = require("./Colony");
const Resource_1 = require("../../common/Resource");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
class Ganymede extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.GANYMEDE,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_PRODUCTION,
            buildResource: Resource_1.Resource.PLANTS,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            tradeQuantity: [0, 1, 2, 3, 4, 5, 6],
            tradeResource: Resource_1.Resource.PLANTS,
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusResource: Resource_1.Resource.PLANTS,
        });
    }
}
exports.Ganymede = Ganymede;
