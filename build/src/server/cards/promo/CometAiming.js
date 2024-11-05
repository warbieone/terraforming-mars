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
const Payment_1 = require("../../../common/inputs/Payment");
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
                        eb.titanium(1).startAction.resource(CardResource_1.CardResource.ASTEROID).asterix();
                    }).br;
                    b.or().br;
                    b.action('Remove 1 asteroid here to place an ocean.', (eb) => {
                        eb.resource(CardResource_1.CardResource.ASTEROID).startAction.oceans(1);
                    });
                }),
            },
        });
    }
    canAffordOcean(player) {
        return player.canAfford({ cost: 0, tr: { oceans: 1 } });
    }
    canAct(player) {
        if (player.titanium > 0) {
            return true;
        }
        if (this.resourceCount > 0 && this.canAffordOcean(player)) {
            return true;
        }
        return false;
    }
    action(player) {
        const asteroidCards = player.getResourceCards(CardResource_1.CardResource.ASTEROID);
        const addAsteroidToSelf = function () {
            player.pay(Payment_1.Payment.of({ titanium: 1 }));
            player.addResourceTo(asteroidCards[0], { log: true });
            return undefined;
        };
        const addAsteroidToCard = new SelectCard_1.SelectCard('Select card to add 1 asteroid', 'Add asteroid', asteroidCards)
            .andThen(([card]) => {
            player.pay(Payment_1.Payment.of({ titanium: 1 }));
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
            return asteroidCards.length === 1 ? addAsteroidToSelf() : addAsteroidToCard;
        }
        if (player.titanium === 0) {
            return spendAsteroidResource();
        }
        const availableActions = [];
        if (this.canAffordOcean(player)) {
            const placeOceanOption = new SelectOption_1.SelectOption('Remove an asteroid resource to place an ocean', 'Remove asteroid').andThen(spendAsteroidResource);
            if (!player.game.canAddOcean()) {
                placeOceanOption.warnings = ['maxoceans'];
            }
            availableActions.push(placeOceanOption);
        }
        if (asteroidCards.length === 1) {
            availableActions.push(new SelectOption_1.SelectOption('Spend 1 titanium to gain 1 asteroid resource', 'Spend titanium').andThen(addAsteroidToSelf));
        }
        else {
            availableActions.push(addAsteroidToCard);
        }
        if (availableActions.length === 1) {
            const action = availableActions[0];
            if (action instanceof SelectOption_1.SelectOption)
                return action.cb(undefined);
            return availableActions[0];
        }
        return new OrOptions_1.OrOptions(...availableActions);
    }
}
exports.CometAiming = CometAiming;
