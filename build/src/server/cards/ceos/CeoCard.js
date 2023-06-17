"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoCard = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
class CeoCard extends Card_1.Card {
    constructor(properties) {
        super(Object.assign({ type: CardType_1.CardType.CEO }, properties));
        this.isDisabled = false;
    }
    canAct(_player) {
        return this.isDisabled === false;
    }
    bespokePlay(_player) {
        return undefined;
    }
    get type() {
        return CardType_1.CardType.CEO;
    }
}
exports.CeoCard = CeoCard;
//# sourceMappingURL=CeoCard.js.map