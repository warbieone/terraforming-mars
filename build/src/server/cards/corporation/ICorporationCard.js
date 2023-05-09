"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isICorporationCard = void 0;
const CardType_1 = require("../../../common/cards/CardType");
function isICorporationCard(card) {
    return card.type === CardType_1.CardType.CORPORATION;
}
exports.isICorporationCard = isICorporationCard;
