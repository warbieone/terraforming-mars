"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveResourcesFromCard = void 0;
const CardResource_1 = require("../../common/CardResource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const SelectOption_1 = require("../inputs/SelectOption");
const CardName_1 = require("../../common/cards/CardName");
const DeferredAction_1 = require("./DeferredAction");
const UnderworldExpansion_1 = require("../underworld/UnderworldExpansion");
const animalsProtectedCards = [CardName_1.CardName.PETS, CardName_1.CardName.BIOENGINEERING_ENCLOSURE];
class RemoveResourcesFromCard extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, count = 1, options) {
        var _a, _b, _c, _d;
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.priority = DeferredAction_1.Priority.ATTACK_OPPONENT;
        this.resourceType = resourceType;
        this.count = count;
        this.ownCardsOnly = (_a = options === null || options === void 0 ? void 0 : options.ownCardsOnly) !== null && _a !== void 0 ? _a : false;
        this.mandatory = (_b = options === null || options === void 0 ? void 0 : options.mandatory) !== null && _b !== void 0 ? _b : true;
        this.blockable = (_c = options === null || options === void 0 ? void 0 : options.blockable) !== null && _c !== void 0 ? _c : true;
        this.title = (_d = options === null || options === void 0 ? void 0 : options.title) !== null && _d !== void 0 ? _d : (`Select card to remove ${count} ${resourceType}(s)`);
        if (this.ownCardsOnly === true) {
            this.priority = DeferredAction_1.Priority.LOSE_RESOURCE_OR_PRODUCTION;
        }
    }
    execute() {
        if (this.ownCardsOnly === false && this.player.game.isSoloMode()) {
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        const cards = RemoveResourcesFromCard.getAvailableTargetCards(this.player, this.resourceType, this.ownCardsOnly);
        if (cards.length === 0) {
            return undefined;
        }
        const selectCard = new SelectCard_1.SelectCard(this.title, 'Remove resource(s)', cards, { showOwner: true })
            .andThen(([card]) => {
            this.attack(card);
            return undefined;
        });
        if (this.mandatory) {
            if (cards.length === 1) {
                this.attack(cards[0]);
                return undefined;
            }
            return selectCard;
        }
        return new OrOptions_1.OrOptions(selectCard, new SelectOption_1.SelectOption('Do not remove'));
    }
    attack(card) {
        const target = this.player.game.getCardPlayerOrThrow(card.name);
        if (this.blockable === false) {
            target.removeResourceFrom(card, this.count, { removingPlayer: this.player });
            this.cb(true);
            return;
        }
        return UnderworldExpansion_1.UnderworldExpansion.maybeBlockAttack(target, this.player, ((proceed) => {
            if (proceed) {
                target.removeResourceFrom(card, this.count, { removingPlayer: this.player });
            }
            this.cb(proceed);
            return undefined;
        }));
    }
    static getAvailableTargetCards(player, resourceType, ownCardsOnly = false) {
        let resourceCards;
        if (ownCardsOnly) {
            if (resourceType === CardResource_1.CardResource.ANIMAL) {
                resourceCards = player.getCardsWithResources(resourceType).filter((card) => animalsProtectedCards.includes(card.name) === false);
            }
            else {
                resourceCards = player.getCardsWithResources(resourceType);
            }
        }
        else {
            resourceCards = [];
            player.game.getPlayers().forEach((p) => {
                switch (resourceType) {
                    case CardResource_1.CardResource.ANIMAL:
                        if (p.hasProtectedHabitats() && player.id !== p.id)
                            return;
                        resourceCards.push(...p.getCardsWithResources(resourceType).filter((card) => animalsProtectedCards.includes(card.name) === false));
                        break;
                    case CardResource_1.CardResource.MICROBE:
                        if (p.hasProtectedHabitats() && player.id !== p.id)
                            return;
                    default:
                        resourceCards.push(...p.getCardsWithResources(resourceType));
                }
            });
        }
        return resourceCards;
    }
}
exports.RemoveResourcesFromCard = RemoveResourcesFromCard;
//# sourceMappingURL=RemoveResourcesFromCard.js.map