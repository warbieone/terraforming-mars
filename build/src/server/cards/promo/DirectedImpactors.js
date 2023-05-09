"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectedImpactors = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const Tag_1 = require("../../../common/cards/Tag");
const SelectCard_1 = require("../../inputs/SelectCard");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const constants_1 = require("../../../common/constants");
const LogHelper_1 = require("../../LogHelper");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
class DirectedImpactors extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.DIRECTED_IMPACTORS,
            tags: [Tag_1.Tag.SPACE],
            cost: 8,
            resourceType: CardResource_1.CardResource.ASTEROID,
            metadata: {
                cardNumber: 'X19',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 6 M€ to add 1 asteroid to ANY CARD (titanium may be used to pay for this).', (eb) => {
                        eb.megacredits(6).openBrackets.titanium(1).closeBrackets.startAction.asteroids(1).asterix();
                    }).br;
                    b.or().br;
                    b.action('Remove 1 asteroid here to raise temperature 1 step.', (eb) => {
                        eb.asteroids(1).startAction.temperature(1);
                    });
                }),
            },
        });
    }
    canAct(player) {
        const cardHasResources = this.resourceCount > 0;
        const canPayForAsteroid = player.canAfford(6, { titanium: true });
        if (player.game.getTemperature() === constants_1.MAX_TEMPERATURE && cardHasResources)
            return true;
        if (canPayForAsteroid)
            return true;
        return player.canAfford(0, { tr: { temperature: 1 } }) && cardHasResources;
    }
    action(player) {
        const asteroidCards = player.getResourceCards(CardResource_1.CardResource.ASTEROID);
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Pay 6 M€ to add 1 asteroid to a card', 'Pay', () => this.addResource(player, asteroidCards));
        const spendResource = new SelectOption_1.SelectOption('Remove 1 asteroid to raise temperature 1 step', 'Remove asteroid', () => this.spendResource(player));
        const temperatureIsMaxed = player.game.getTemperature() === constants_1.MAX_TEMPERATURE;
        if (this.resourceCount > 0) {
            if (!temperatureIsMaxed && player.canAfford(0, { tr: { temperature: 1 } })) {
                opts.push(spendResource);
            }
        }
        else {
            return this.addResource(player, asteroidCards);
        }
        if (player.canAfford(6, { titanium: true })) {
            opts.push(addResource);
        }
        else {
            return this.spendResource(player);
        }
        return new OrOptions_1.OrOptions(...opts);
    }
    addResource(player, asteroidCards) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 6, { canUseTitanium: true, title: 'Select how to pay for Directed Impactors action' }));
        if (asteroidCards.length === 1) {
            player.addResourceTo(this, { log: true });
            return undefined;
        }
        return new SelectCard_1.SelectCard('Select card to add 1 asteroid', 'Add asteroid', asteroidCards, ([card]) => {
            player.addResourceTo(card, { log: true });
            return undefined;
        });
    }
    spendResource(player) {
        this.resourceCount--;
        LogHelper_1.LogHelper.logRemoveResource(player, this, 1, 'raise temperature 1 step');
        player.game.increaseTemperature(player, 1);
        return undefined;
    }
}
exports.DirectedImpactors = DirectedImpactors;
