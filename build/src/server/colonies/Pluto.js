"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pluto = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
class Pluto extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.PLUTO,
            buildType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS,
            buildQuantity: [2, 2, 2],
            tradeType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS,
            tradeQuantity: [0, 1, 2, 2, 3, 3, 4],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS_AND_DISCARD_ONE,
        });
    }
}
exports.Pluto = Pluto;
