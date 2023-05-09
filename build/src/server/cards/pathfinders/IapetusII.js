"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IapetusII = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
const CardResource_1 = require("../../../common/CardResource");
class IapetusII extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.IAPETUS_II,
            cardResource: CardResource_1.CardResource.DATA,
            buildType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            buildQuantity: [3, 3, 3],
            tradeType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            tradeQuantity: [0, 1, 2, 3, 4, 5, 6],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
        });
        this.isActive = false;
    }
}
exports.IapetusII = IapetusII;
