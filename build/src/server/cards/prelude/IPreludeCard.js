"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPreludeCard = void 0;
const CardType_1 = require("../../../common/cards/CardType");
function isPreludeCard(card) {
    return card.type === CardType_1.CardType.PRELUDE;
}
exports.isPreludeCard = isPreludeCard;
