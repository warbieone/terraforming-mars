"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeProjectCard = exports.serializeProjectCard = void 0;
const createCard_1 = require("../createCard");
const ICeoCard_1 = require("./ceos/ICeoCard");
const ICloneTagCard_1 = require("./pathfinders/ICloneTagCard");
const SelfReplicatingRobots_1 = require("./promo/SelfReplicatingRobots");
const CardType_1 = require("../../common/cards/CardType");
function serializeProjectCard(card) {
    const serialized = {
        name: card.name,
    };
    if (card.type === CardType_1.CardType.PROXY) {
        return serialized;
    }
    if (card.bonusResource !== undefined) {
        serialized.bonusResource = card.bonusResource;
    }
    if (card.resourceCount !== undefined) {
        serialized.resourceCount = card.resourceCount;
    }
    if (card.generationUsed !== undefined) {
        serialized.generationUsed = card.generationUsed;
    }
    if (card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots) {
        serialized.targetCards = card.targetCards.map((t) => {
            return {
                card: { name: t.name },
                resourceCount: t.resourceCount,
            };
        });
    }
    if ((0, ICloneTagCard_1.isICloneTagCard)(card)) {
        serialized.cloneTag = card.cloneTag;
    }
    if ((0, ICeoCard_1.isCeoCard)(card)) {
        serialized.isDisabled = card.isDisabled;
        if (card.opgActionIsActive !== undefined) {
            serialized.opgActionIsActive = card.opgActionIsActive;
        }
    }
    if (card.data !== undefined) {
        serialized.data = card.data;
    }
    return serialized;
}
exports.serializeProjectCard = serializeProjectCard;
function deserializeProjectCard(element) {
    const card = (0, createCard_1.newProjectCard)(element.name);
    if (card === undefined) {
        throw new Error(`Card ${element.name} not found`);
    }
    if (element.resourceCount !== undefined) {
        card.resourceCount = element.resourceCount;
    }
    if (card.hasOwnProperty('data')) {
        card.data = element.data;
    }
    if (element.generationUsed !== undefined) {
        card.generationUsed = element.generationUsed;
    }
    if ((0, ICloneTagCard_1.isICloneTagCard)(card) && element.cloneTag !== undefined) {
        card.cloneTag = element.cloneTag;
    }
    if (card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots && element.targetCards !== undefined) {
        card.targetCards = [];
        element.targetCards.forEach((targetCard) => {
            const foundTargetCard = (0, createCard_1.newProjectCard)(targetCard.card.name);
            if (foundTargetCard !== undefined) {
                foundTargetCard.resourceCount = targetCard.resourceCount;
                card.targetCards.push(foundTargetCard);
            }
            else {
                console.warn('did not find card for SelfReplicatingRobots', targetCard);
            }
        });
    }
    if (!(card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots)) {
        if (element.bonusResource !== undefined) {
            card.bonusResource = Array.isArray(element.bonusResource) ? element.bonusResource : [element.bonusResource];
        }
    }
    if ((0, ICeoCard_1.isCeoCard)(card)) {
        card.isDisabled = element.isDisabled;
        if (element.opgActionIsActive !== undefined) {
            card.opgActionIsActive = element.opgActionIsActive;
        }
    }
    return card;
}
exports.deserializeProjectCard = deserializeProjectCard;
