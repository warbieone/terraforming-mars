"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavittII = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const Resource_1 = require("../../../common/Resource");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class LeavittII extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.LEAVITT_II,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_SCIENCE_TAGS_AND_CLONE_TAG,
            tradeType: ColonyBenefit_1.ColonyBenefit.RAISE_PLANETARY_TRACK,
            tradeQuantity: [0, 1, 1, 2, 2, 3, 4],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_RESOURCES,
            colonyBonusQuantity: 2,
            colonyBonusResource: Resource_1.Resource.MEGACREDITS,
        });
    }
}
exports.LeavittII = LeavittII;
