"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCeoCard = void 0;
const CardType_1 = require("../../../common/cards/CardType");
function isCeoCard(card) {
    return card.type === CardType_1.CardType.CEO;
}
exports.isCeoCard = isCeoCard;
