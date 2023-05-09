"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iapetus = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class Iapetus extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.IAPETUS,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_TR,
            tradeType: ColonyBenefit_1.ColonyBenefit.GAIN_TR,
            tradeQuantity: [0, 0, 0, 1, 1, 1, 2],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.GAIN_CARD_DISCOUNT,
        });
    }
}
exports.Iapetus = Iapetus;
