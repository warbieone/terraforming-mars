"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIProjectCard = void 0;
const CardType_1 = require("../../common/cards/CardType");
function isIProjectCard(card) {
    return card.type === CardType_1.CardType.AUTOMATED ||
        card.type === CardType_1.CardType.ACTIVE ||
        card.type === CardType_1.CardType.EVENT;
}
exports.isIProjectCard = isIProjectCard;
