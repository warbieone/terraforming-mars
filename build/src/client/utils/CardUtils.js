"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCardActivated = exports.getCardsByType = void 0;
const ClientCardManifest_1 = require("@/client/cards/ClientCardManifest");
function getCardsByType(inCards, cardTypes) {
    const cards = inCards.filter((card) => cardTypes.includes((0, ClientCardManifest_1.getCardOrThrow)(card.name).type));
    return cards.reverse();
}
exports.getCardsByType = getCardsByType;
function isCardActivated(card, player) {
    return player.actionsThisGeneration.includes(card.name) || card.isDisabled;
}
exports.isCardActivated = isCardActivated;
