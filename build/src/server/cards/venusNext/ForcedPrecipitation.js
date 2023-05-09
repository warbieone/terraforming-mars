"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForcedPrecipitation = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardResource_1 = require("../../../common/CardResource");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const constants_1 = require("../../../common/constants");
const CardName_1 = require("../../../common/cards/CardName");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const LogHelper_1 = require("../../LogHelper");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class ForcedPrecipitation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.FORCED_PRECIPITATION,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 8,
            resourceType: CardResource_1.CardResource.FLOATER,
            metadata: {
                cardNumber: '226',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 M€ to add 1 floater to THIS card.', (eb) => {
                        eb.megacredits(2).startAction.floaters(1);
                    }).br;
                    b.or().br;
                    b.action('Spend 2 floaters here to increase Venus 1 step.', (eb) => {
                        eb.floaters(2).startAction.venus(1);
                    });
                }),
            },
        });
    }
    canAct(player) {
        const venusMaxed = player.game.getVenusScaleLevel() === constants_1.MAX_VENUS_SCALE;
        const canSpendResource = this.resourceCount > 1 && !venusMaxed;
        return player.canAfford(2) || (canSpendResource && player.canAfford(0, { tr: { venus: 1 } }));
    }
    action(player) {
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Pay 2 M€ to add 1 floater to this card', 'Pay', () => this.addResource(player));
        const spendResource = new SelectOption_1.SelectOption('Remove 2 floaters to raise Venus 1 step', 'Remove floaters', () => this.spendResource(player));
        if (this.resourceCount > 1 && player.game.getVenusScaleLevel() < constants_1.MAX_VENUS_SCALE && player.canAfford(0, { tr: { venus: 1 } })) {
            opts.push(spendResource);
        }
        else {
            return this.addResource(player);
        }
        if (player.canAfford(2)) {
            opts.push(addResource);
        }
        else {
            return this.spendResource(player);
        }
        return new OrOptions_1.OrOptions(...opts);
    }
    addResource(player) {
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 2, { title: 'Select how to pay for action', afterPay: () => {
                player.addResourceTo(this, { log: true });
            } }));
        return undefined;
    }
    spendResource(player) {
        player.removeResourceFrom(this, 2);
        const actual = player.game.increaseVenusScaleLevel(player, 1);
        LogHelper_1.LogHelper.logVenusIncrease(player, actual);
        return undefined;
    }
}
exports.ForcedPrecipitation = ForcedPrecipitation;
