"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Titania = void 0;
const Colony_1 = require("../../colonies/Colony");
const Resource_1 = require("../../../common/Resource");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class Titania extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.TITANIA,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_VP,
            buildQuantity: [5, 3, 2],
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_VP,
            tradeQuantity: [2, 2, 2, 1, 1, 0, 0],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.LOSE_RESOURCES,
            colonyBonusQuantity: 3,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
            shouldIncreaseTrack: 'no',
        });
    }
}
exports.Titania = Titania;
