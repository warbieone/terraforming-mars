"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venus = void 0;
const Colony_1 = require("../../colonies/Colony");
const ColonyName_1 = require("../../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../../common/colonies/ColonyBenefit");
class Venus extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.VENUS,
            description: [
                'Increase Venus 1 step',
                'Add n resources to ANY Venus card',
                'Add 1 resource to ANY Venus card',
            ],
            buildType: ColonyBenefit_1.ColonyBenefit.INCREASE_VENUS_SCALE,
            tradeType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_VENUS_CARD,
            tradeQuantity: [0, 0, 0, 1, 2, 3, 4],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_VENUS_CARD,
        });
        this.isActive = false;
    }
}
exports.Venus = Venus;
//# sourceMappingURL=Venus.js.map