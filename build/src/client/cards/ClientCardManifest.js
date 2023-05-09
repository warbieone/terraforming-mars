"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toName = exports.byModule = exports.byType = exports.getCards = exports.getCardOrThrow = exports.getCard = void 0;
const cardJson = require("@/genfiles/cards.json");
const cards = new Map();
const cardArray = [];
function getCard(cardName) {
    return cards.get(cardName);
}
exports.getCard = getCard;
function getCardOrThrow(cardName) {
    const card = getCard(cardName);
    if (card === undefined) {
        throw new Error(`card not found ${cardName}`);
    }
    return card;
}
exports.getCardOrThrow = getCardOrThrow;
function getCards(filter) {
    return cardArray.filter(filter);
}
exports.getCards = getCards;
function byType(cardType) {
    return (card) => card.type === cardType;
}
exports.byType = byType;
function byModule(module) {
    return (card) => card.module === module;
}
exports.byModule = byModule;
const toName = (card) => card.name;
exports.toName = toName;
function initialize() {
    cardJson.forEach((card) => {
        cards.set(card.name, card);
        cardArray.push(card);
    });
}
initialize();
