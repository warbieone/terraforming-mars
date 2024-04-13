"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveResourcesFromCard = void 0;
const CardResource_1 = require("../../common/CardResource");
const OrOptions_1 = require("../inputs/OrOptions");
const SelectCard_1 = require("../inputs/SelectCard");
const SelectOption_1 = require("../inputs/SelectOption");
const DeferredAction_1 = require("./DeferredAction");
const UnderworldExpansion_1 = require("../underworld/UnderworldExpansion");
class RemoveResourcesFromCard extends DeferredAction_1.DeferredAction {
    constructor(player, cardResource, count = 1, options) {
        super(player, DeferredAction_1.Priority.ATTACK_OPPONENT);
        this.priority = DeferredAction_1.Priority.ATTACK_OPPONENT;
        this.cardResource = cardResource;
        this.count = count;
        this.source = options?.source ?? 'all';
        this.mandatory = options?.mandatory ?? true;
        this.blockable = options?.blockable ?? true;
        this.autoselect = options?.autoselect ?? true;
        this.title = options?.title ?? (`Select card to remove ${count} ${cardResource}(s)`);
        if (this.source === 'self') {
            this.priority = DeferredAction_1.Priority.LOSE_RESOURCE_OR_PRODUCTION;
            if (this.blockable) {
                throw new Error('Cannot block removing resources from self');
            }
        }
    }
    execute() {
        if (this.source !== 'self' && this.player.game.isSoloMode()) {
            this.player.resolveInsuranceInSoloGame();
            this.cb({ card: undefined, owner: undefined, proceed: true });
            return undefined;
        }
        const cards = RemoveResourcesFromCard.getAvailableTargetCards(this.player, this.cardResource, this.source);
        if (cards.length === 0) {
            this.cb({ card: undefined, owner: undefined, proceed: false });
            return undefined;
        }
        const selectCard = new SelectCard_1.SelectCard(this.title, 'Remove resource(s)', cards, { showOwner: true })
            .andThen(([card]) => {
            this.attack(card);
            return undefined;
        });
        if (this.mandatory) {
            if (cards.length === 1 && this.autoselect === true) {
                this.attack(cards[0]);
                return undefined;
            }
            return selectCard;
        }
        return new OrOptions_1.OrOptions(selectCard, new SelectOption_1.SelectOption('Do not remove'));
    }
    attack(card) {
        const target = this.player.game.getCardPlayerOrThrow(card.name);
        target.defer(UnderworldExpansion_1.UnderworldExpansion.maybeBlockAttack(target, this.player, ((proceed) => {
            if (proceed) {
                target.removeResourceFrom(card, this.count, { removingPlayer: this.player });
            }
            this.cb({ card: card, owner: target, proceed: proceed });
            return undefined;
        })));
    }
    static getAvailableTargetCards(player, resourceType, source = 'all') {
        const resourceCards = [];
        for (const p of player.game.getPlayers()) {
            const get = () => p.getCardsWithResources(resourceType).filter((card) => card.protectedResources !== true);
            if (p === player) {
                if (source !== 'opponents') {
                    resourceCards.push(...get());
                }
            }
            else {
                if (source !== 'self') {
                    switch (resourceType) {
                        case CardResource_1.CardResource.ANIMAL:
                        case CardResource_1.CardResource.MICROBE:
                            if (!p.hasProtectedHabitats()) {
                                resourceCards.push(...get());
                            }
                            break;
                        default:
                            resourceCards.push(...get());
                    }
                }
            }
        }
        return resourceCards;
    }
}
exports.RemoveResourcesFromCard = RemoveResourcesFromCard;
