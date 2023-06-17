"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Titan = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const CardResource_1 = require("../../common/CardResource");
class Titan extends Colony_1.Colony {
    constructor() {
        super({
            description: [
                'Add 3 floaters to ANY card',
                'Add n floaters to ANY card',
                'Add 1 floater to ANY card',
            ],
            name: ColonyName_1.ColonyName.TITAN,
            cardResource: CardResource_1.CardResource.FLOATER,
            buildType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            buildQuantity: [3, 3, 3],
            tradeType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            tradeQuantity: [0, 1, 1, 2, 3, 3, 4],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
        });
        this.isActive = false;
    }
}
exports.Titan = Titan;
//# sourceMappingURL=Titan.js.map