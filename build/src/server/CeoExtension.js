"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoExtension = void 0;
const ICeoCard_1 = require("./cards/ceos/ICeoCard");
class CeoExtension {
    static ceoActionIsUsable(player) {
        return player.playedCards.some((card) => (0, ICeoCard_1.isCeoCard)(card) && card.canAct(player));
    }
}
exports.CeoExtension = CeoExtension;
//# sourceMappingURL=CeoExtension.js.map