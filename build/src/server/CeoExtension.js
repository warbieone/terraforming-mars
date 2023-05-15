"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoExtension = void 0;
const ICeoCard_1 = require("./cards/ceos/ICeoCard");
const CardName_1 = require("../common/cards/CardName");
class CeoExtension {
    static calculateVictoryPoints(player, vpb) {
        const duncan = player.getCeo(CardName_1.CardName.DUNCAN);
        if ((duncan === null || duncan === void 0 ? void 0 : duncan.isDisabled) === true && duncan.generationUsed !== undefined) {
            vpb.setVictoryPoints('victoryPoints', 7 - duncan.generationUsed, 'CEO VP');
        }
    }
    static getBonusWildTags(player) {
        const xavier = player.getCeo(CardName_1.CardName.XAVIER);
        return (xavier === null || xavier === void 0 ? void 0 : xavier.opgActionIsActive) === true ? 2 : 0;
    }
    static ceoActionIsUsable(player) {
        return player.playedCards.some((card) => (0, ICeoCard_1.isCeoCard)(card) && card.canAct(player));
    }
}
exports.CeoExtension = CeoExtension;
//# sourceMappingURL=CeoExtension.js.map