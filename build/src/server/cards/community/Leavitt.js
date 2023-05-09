"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leavitt = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class Leavitt extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.LEAVITT,
            buildType: ColonyBenefit_1.ColonyBenefit.GAIN_SCIENCE_TAG,
            tradeType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_KEEP_ONE,
            tradeQuantity: [1, 2, 3, 4, 5, 6, 7],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_BUY_ONE,
        });
    }
}
exports.Leavitt = Leavitt;
