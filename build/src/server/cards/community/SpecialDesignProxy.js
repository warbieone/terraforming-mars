"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialDesignProxy = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
class SpecialDesignProxy {
    constructor() {
        this.resourceCount = 0;
    }
    get cost() {
        return 0;
    }
    get tags() {
        return [];
    }
    get name() {
        return CardName_1.CardName.SPECIAL_DESIGN_PROXY;
    }
    get type() {
        return CardType_1.CardType.PROXY;
    }
    canPlay() {
        return false;
    }
    get metadata() {
        throw new Error('SpecialDesignProxy is a proxy card, not a real card. Should not render');
    }
    play() {
        return undefined;
    }
    getVictoryPoints() {
        return 0;
    }
    getRequirementBonus(player) {
        if (player.lastCardPlayed === CardName_1.CardName.SPECIAL_DESIGN) {
            return 2;
        }
        return 0;
    }
}
exports.SpecialDesignProxy = SpecialDesignProxy;
