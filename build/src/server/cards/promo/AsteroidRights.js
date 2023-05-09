"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidRights = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const LogHelper_1 = require("../../LogHelper");
const SelectCard_1 = require("../../inputs/SelectCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class AsteroidRights extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ASTEROID_RIGHTS,
            tags: [Tag_1.Tag.EARTH, Tag_1.Tag.SPACE],
            cost: 10,
            resourceType: CardResource_1.CardResource.ASTEROID,
            behavior: {
                addResources: 2,
            },
            metadata: {
                cardNumber: 'X31',
                description: 'Add 2 asteroids to this card.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 M€ to add 1 asteroid to ANY card.', (eb) => {
                        eb.megacredits(1).startAction.asteroids(1).asterix().nbsp.or();
                    }).br;
                    b.action('Spend 1 asteroid here to increase M€ production 1 step OR gain 2 titanium.', (eb) => {
                        eb.asteroids(1)
                            .startAction.production((pb) => pb.megacredits(1))
                            .or()
                            .titanium(2);
                    }).br;
                    b.asteroids(2);
                }),
            },
        });
    }
    canAct(player) {
        return player.canAfford(1) || this.resourceCount > 0;
    }
    action(player) {
        const canAddAsteroid = player.canAfford(1);
        const hasAsteroids = this.resourceCount > 0;
        const asteroidCards = player.getResourceCards(CardResource_1.CardResource.ASTEROID);
        const gainTitaniumOption = new SelectOption_1.SelectOption('Remove 1 asteroid on this card to gain 2 titanium', 'Remove asteroid', () => {
            this.resourceCount--;
            player.titanium += 2;
            LogHelper_1.LogHelper.logRemoveResource(player, this, 1, 'gain 2 titanium');
            return undefined;
        });
        const increaseMcProdOption = new SelectOption_1.SelectOption('Remove 1 asteroid on this card to increase M€ production 1 step', 'Remove asteroid', () => {
            this.resourceCount--;
            player.production.add(Resource_1.Resource.MEGACREDITS, 1);
            LogHelper_1.LogHelper.logRemoveResource(player, this, 1, 'increase M€ production 1 step');
            return undefined;
        });
        const addAsteroidToSelf = new SelectOption_1.SelectOption('Add 1 asteroid to this card', 'Add asteroid', () => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 1, { title: 'Select how to pay for asteroid' }));
            player.addResourceTo(this, { log: true });
            return undefined;
        });
        const addAsteroidOption = new SelectCard_1.SelectCard('Select card to add 1 asteroid', 'Add asteroid', asteroidCards, ([card]) => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 1, { title: 'Select how to pay for asteroid' }));
            player.addResourceTo(card, { log: true });
            return undefined;
        });
        if (!canAddAsteroid)
            return new OrOptions_1.OrOptions(gainTitaniumOption, increaseMcProdOption);
        if (!hasAsteroids) {
            if (asteroidCards.length === 1)
                return addAsteroidToSelf.cb();
            return addAsteroidOption;
        }
        const opts = [];
        opts.push(gainTitaniumOption);
        opts.push(increaseMcProdOption);
        asteroidCards.length === 1 ? opts.push(addAsteroidToSelf) : opts.push(addAsteroidOption);
        return new OrOptions_1.OrOptions(...opts);
    }
}
exports.AsteroidRights = AsteroidRights;
