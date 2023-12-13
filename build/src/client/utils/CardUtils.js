"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCardActivated = exports.getCardsByType = void 0;
const ClientCardManifest_1 = require("@/client/cards/ClientCardManifest");
function getCardsByType(inCards, cardTypes) {
    const outCards = inCards.filter((inCard) => {
        const outCard = (0, ClientCardManifest_1.getCard)(inCard.name);
        if (outCard === undefined) {
            return false;
        }
        return cardTypes.includes(outCard.type);
    });
    return outCards.reverse();
}
exports.getCardsByType = getCardsByType;
function isCardActivated(card, player) {
    return player.actionsThisGeneration.includes(card.name) || (card.isDisabled === true);
}
exports.isCardActivated = isCardActivated;
//# sourceMappingURL=CardUtils.js.map