"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeProjectCard = exports.serializeProjectCard = void 0;
const MiningCard_1 = require("./base/MiningCard");
const ICeoCard_1 = require("./ceos/ICeoCard");
const ICloneTagCard_1 = require("./pathfinders/ICloneTagCard");
const SelfReplicatingRobots_1 = require("./promo/SelfReplicatingRobots");
function serializeProjectCard(c) {
    const result = {
        name: c.name,
    };
    if (c.bonusResource !== undefined) {
        result.bonusResource = c.bonusResource;
    }
    if (c.resourceCount !== undefined) {
        result.resourceCount = c.resourceCount;
    }
    if (c instanceof SelfReplicatingRobots_1.SelfReplicatingRobots) {
        result.targetCards = c.targetCards.map((t) => {
            return {
                card: { name: t.card.name },
                resourceCount: t.resourceCount,
            };
        });
    }
    if ((0, ICloneTagCard_1.isICloneTagCard)(c)) {
        result.cloneTag = c.cloneTag;
    }
    if ((0, ICeoCard_1.isCeoCard)(c)) {
        result.isDisabled = c.isDisabled;
        if (c.opgActionIsActive !== undefined) {
            result.opgActionIsActive = c.opgActionIsActive;
        }
        if (c.generationUsed !== undefined) {
            result.generationUsed = c.generationUsed;
        }
    }
    return result;
}
exports.serializeProjectCard = serializeProjectCard;
function deserializeProjectCard(element, cardFinder) {
    const card = cardFinder.getProjectCardByName(element.name);
    if (card === undefined) {
        throw new Error(`Card ${element.name} not found`);
    }
    if (element.resourceCount !== undefined) {
        card.resourceCount = element.resourceCount;
    }
    if ((0, ICloneTagCard_1.isICloneTagCard)(card) && element.cloneTag !== undefined) {
        card.cloneTag = element.cloneTag;
    }
    if (card instanceof SelfReplicatingRobots_1.SelfReplicatingRobots && element.targetCards !== undefined) {
        card.targetCards = [];
        element.targetCards.forEach((targetCard) => {
            const foundTargetCard = cardFinder.getProjectCardByName(targetCard.card.name);
            if (foundTargetCard !== undefined) {
                card.targetCards.push({
                    card: foundTargetCard,
                    resourceCount: targetCard.resourceCount,
                });
            }
            else {
                console.warn('did not find card for SelfReplicatingRobots', targetCard);
            }
        });
    }
    if (card instanceof MiningCard_1.MiningCard && element.bonusResource !== undefined) {
        card.bonusResource = Array.isArray(element.bonusResource) ? element.bonusResource : [element.bonusResource];
    }
    if ((0, ICeoCard_1.isCeoCard)(card)) {
        card.isDisabled = element.isDisabled;
        if (element.opgActionIsActive !== undefined) {
            card.opgActionIsActive = element.opgActionIsActive;
        }
        if (element.generationUsed !== undefined) {
            card.generationUsed = element.generationUsed;
        }
    }
    return card;
}
exports.deserializeProjectCard = deserializeProjectCard;
//# sourceMappingURL=CardSerialization.js.map