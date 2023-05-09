"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveResourcesFromCard = void 0;
const CardResource_1 = require("../../common/CardResource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const SelectOption_1 = require("../inputs/SelectOption");
const CardName_1 = require("../../common/cards/CardName");
const DeferredAction_1 = require("./DeferredAction");
const animalsProtectedCards = [CardName_1.CardName.PETS, CardName_1.CardName.BIOENGINEERING_ENCLOSURE];
class RemoveResourcesFromCard extends DeferredAction_1.DeferredAction {
    constructor(player, resourceType, count = 1, ownCardsOnly = false, mandatory = true, title = 'Select card to remove ' + count + ' ' + resourceType + '(s)') {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.resourceType = resourceType;
        this.count = count;
        this.ownCardsOnly = ownCardsOnly;
        this.mandatory = mandatory;
        this.title = title;
        this.priority = DeferredAction_1.Priority.ATTACK_OPPONENT;
        if (ownCardsOnly) {
            this.priority = DeferredAction_1.Priority.LOSE_RESOURCE_OR_PRODUCTION;
        }
    }
    execute() {
        if (this.ownCardsOnly === false && this.player.game.isSoloMode()) {
            this.player.resolveInsuranceInSoloGame();
            return undefined;
        }
        const resourceCards = RemoveResourcesFromCard.getAvailableTargetCards(this.player, this.resourceType, this.ownCardsOnly);
        if (resourceCards.length === 0) {
            return undefined;
        }
        const selectCard = new SelectCard_1.SelectCard(this.title, 'Remove resource(s)', resourceCards, ([card]) => {
            const owner = this.player.game.getCardPlayerOrThrow(card.name);
            owner.removeResourceFrom(card, this.count, { removingPlayer: this.player });
            return undefined;
        }, {
            showOwner: true,
        });
        if (this.mandatory) {
            if (resourceCards.length === 1) {
                const card = resourceCards[0];
                const owner = this.player.game.getCardPlayerOrThrow(card.name);
                owner.removeResourceFrom(card, this.count, { removingPlayer: this.player });
                return undefined;
            }
            return selectCard;
        }
        return new OrOptions_1.OrOptions(selectCard, new SelectOption_1.SelectOption('Do not remove', 'Confirm', () => {
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
