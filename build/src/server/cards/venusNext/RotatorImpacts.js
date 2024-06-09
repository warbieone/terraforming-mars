"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RotatorImpacts = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const constants_1 = require("../../../common/constants");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Options_1 = require("../Options");
const titles_1 = require("../../inputs/titles");
class RotatorImpacts extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.ROTATOR_IMPACTS,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.SPACE],
            cost: 6,
            resourceType: CardResource_1.CardResource.ASTEROID,
            requirements: { venus: 14, max: Options_1.max },
            metadata: {
                cardNumber: '243',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 6 M€ to add an asteroid resource to this card [TITANIUM MAY BE USED].', (eb) => {
                        eb.megacredits(6).super((b) => b.titanium(1)).startAction.asteroids(1);
                    }).br;
                    b.action('Spend 1 resource from this card to increase Venus 1 step.', (eb) => {
                        eb.or().asteroids(1).startAction.venus(1);
                    });
                }),
                description: 'Venus must be 14% or lower',
            },
        });
    }
    canAct(player) {
        const venusMaxed = player.game.getVenusScaleLevel() === constants_1.MAX_VENUS_SCALE;
        const canSpendResource = this.resourceCount > 0 && !venusMaxed;
        return player.canAfford({ cost: 6, titanium: true }) || (canSpendResource && player.canAfford({ cost: 0, tr: { venus: 1 } }));
    }
    action(player) {
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Pay 6 M€ to add 1 asteroid to this card', 'Pay').andThen(() => this.addResource(player));
        const spendResource = new SelectOption_1.SelectOption('Remove 1 asteroid to raise Venus 1 step', 'Remove asteroid').andThen(() => this.spendResource(player));
        if (this.resourceCount > 0 && player.game.getVenusScaleLevel() < constants_1.MAX_VENUS_SCALE) {
            opts.push(spendResource);
        }
        else {
            return this.addResource(player);
        }
        if (player.canAfford({ cost: 6, titanium: true })) {
            opts.push(addResource);
        }
        else {
            return this.spendResource(player);
        }
        return new OrOptions_1.OrOptions(...opts);
    }
    addResource(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 6, { canUseTitanium: true, title: titles_1.TITLES.payForCardAction(this.name) }));
        player.addResourceTo(this, { log: true });
        return undefined;
    }
    spendResource(player) {
        player.removeResourceFrom(this);
        player.game.increaseVenusScaleLevel(player, 1);
        player.game.log('${0} removed an asteroid resource to increase Venus scale 1 step', (b) => b.player(player));
        return undefined;
    }
}
exports.RotatorImpacts = RotatorImpacts;
