"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Miranda = void 0;
const Colony_1 = require("./Colony");
const ColonyName_1 = require("../../common/colonies/ColonyName");
const ColonyBenefit_1 = require("../../common/colonies/ColonyBenefit");
const CardResource_1 = require("../../common/CardResource");
class Miranda extends Colony_1.Colony {
    constructor() {
        super({
            name: ColonyName_1.ColonyName.MIRANDA,
            cardResource: CardResource_1.CardResource.ANIMAL,
            buildType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            tradeType: ColonyBenefit_1.ColonyBenefit.ADD_RESOURCES_TO_CARD,
            tradeQuantity: [0, 1, 1, 2, 2, 3, 3],
            colonyBonusType: ColonyBenefit_1.ColonyBenefit.DRAW_CARDS,
        });
        this.isActive = false;
    }
}
exports.Miranda = Miranda;
