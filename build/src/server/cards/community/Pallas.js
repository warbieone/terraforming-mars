"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pallas = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class Pallas extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.PALLAS,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_INFLUENCE,
            tradeType: ColonyBenefit_1.ColonyBenefit.PLACE_DELEGATES,
            tradeQuantity: [1, 1, 1, 2, 2, 2, 3],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GIVE_MC_PER_DELEGATE,
        });
    }
}
exports.Pallas = Pallas;
