"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CometAiming = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const LogHelper_1 = require("../../LogHelper");
const PlaceOceanTile_1 = require("../../deferredActions/PlaceOceanTile");
const CardRenderer_1 = require("../render/CardRenderer");
class CometAiming extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.COMET_AIMING,
            tags: [Tag_1.Tag.SPACE],
            cost: 17,
            resourceType: CardResource_1.CardResource.ASTEROID,
            metadata: {
                cardNumber: 'X16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 titanium to add 1 asteroid resource to ANY CARD.', (eb) => {
                        eb.titanium(1).startAction.asteroids(1).asterix();
                    }).br;
                    b.or().br;
                    b.action('Remove 1 asteroid here to place an ocean.', (eb) => {
                        eb.asteroids(1).startAction.oceans(1);
                    });
                }),
            },
        });
    }
    canPlaceOcean(player) {
        return player.game.canAddOcean() && player.canAfford(0, { tr: { oceans: 1 } });
    }
    canAct(player) {
        if (player.titanium > 0) {
            return true;
        }
        return this.resourceCount > 0 && this.canPlaceOcean(player);
    }
    action(player) {
        const asteroidCards = player.getResourceCards(CardResource_1.CardResource.ASTEROID);
        const addAsteroidToSelf = function () {
            player.titanium--;
            player.addResourceTo(asteroidCards[0], { log: true });
            return undefined;
        };
        const addAsteroidToCard = new SelectCard_1.SelectCard('Select card to add 1 asteroid', 'Add asteroid', asteroidCards, ([card]) => {
            player.titanium--;
            player.addResourceTo(card, { log: true });
            return undefined;
        });
        const spendAsteroidResource = () => {
            this.resourceCount--;
            LogHelper_1.LogHelper.logRemoveResource(player, this, 1, 'place an ocean');
            player.game.defer(new PlaceOceanTile_1.PlaceOceanTile(player));
            return undefined;
        };
        if (this.resourceCount === 0) {
            if (asteroidCards.length === 1)
                return addAsteroidToSelf();
            return addAsteroidToCard;
        }
        if (player.titanium === 0)
            return spendAsteroidResource();
        const availableActions = [];
        if (this.canPlaceOcean(player)) {
            availableActions.push(new SelectOption_1.SelectOption('Remove an asteroid resource to place an ocean', 'Remove asteroid', spendAsteroidResource));
        }
        if (asteroidCards.length === 1) {
            availableActions.push(new SelectOption_1.SelectOption('Spend 1 titanium to gain 1 asteroid resource', 'Spend titanium', addAsteroidToSelf));
        }
        else {
            availableActions.push(addAsteroidToCard);
        }
        if (availableActions.length === 1) {
            const action = availableActions[0];
            if (action instanceof SelectOption_1.SelectOption)
                return action.cb();
            return availableActions[0];
        }
        return new OrOptions_1.OrOptions(...availableActions);
    }
}
exports.CometAiming = CometAiming;
