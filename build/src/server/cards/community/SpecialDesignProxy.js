"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialDesignProxy = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const ProxyCard_1 = require("../ProxyCard");
class SpecialDesignProxy extends ProxyCard_1.ProxyCard {
    constructor() {
        super(CardName_1.CardName.SPECIAL_DESIGN_PROXY);
    }
    getGlobalParameterRequirementBonus(player) {
        if (player.lastCardPlayed === CardName_1.CardName.SPECIAL_DESIGN) {
            return 2;
        }
        return 0;
    }
}
exports.SpecialDesignProxy = SpecialDesignProxy;
