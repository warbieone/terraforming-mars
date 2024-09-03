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
const titles_1 = require("../../inputs/titles");
class ForcedPrecipitation extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.FORCED_PRECIPITATION,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.VENUS],
            cost: 4,
            resourceType: CardResource_1.CardResource.FLOATER,
            metadata: {
                cardNumber: '226',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2 M€ to add 1 floater to THIS card.', (eb) => {
                        eb.megacredits(2).startAction.resource(CardResource_1.CardResource.FLOATER);
                    }).br;
                    b.or().br;
                    b.action('Spend 2 floaters here to increase Venus 1 step.', (eb) => {
                        eb.resource(CardResource_1.CardResource.FLOATER, 2).startAction.venus(1);
                    });
                }),
            },
        });
    }
    canAct(player) {
        if (player.canAfford(2)) {
            return true;
        }
        if (this.resourceCount > 1 && player.canAfford({ cost: 0, tr: { venus: 1 } })) {
            if (player.game.getVenusScaleLevel() === constants_1.MAX_VENUS_SCALE) {
                this.warnings.add('maxvenus');
            }
            return true;
        }
        return false;
    }
    action(player) {
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Pay 2 M€ to add 1 floater to this card', 'Pay').andThen(() => this.addResource(player));
        const spendResource = new SelectOption_1.SelectOption('Remove 2 floaters to raise Venus 1 step', 'Remove floaters').andThen(() => this.spendResource(player));
        if (player.game.getVenusScaleLevel() === constants_1.MAX_VENUS_SCALE) {
            spendResource.warnings = ['maxvenus'];
        }
        if (this.resourceCount > 1 && player.canAfford({ cost: 0, tr: { venus: 1 } })) {
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
        player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 2, { title: titles_1.TITLES.payForCardAction(this.name) }))
            .andThen(() => player.addResourceTo(this, { log: true }));
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
