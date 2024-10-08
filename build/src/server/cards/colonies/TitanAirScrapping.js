"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TitanAirScrapping = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Payment_1 = require("../../../common/inputs/Payment");
class TitanAirScrapping extends Card_1.Card {
    constructor() {
        super({
            cost: 21,
            tags: [Tag_1.Tag.JOVIAN],
            name: CardName_1.CardName.TITAN_AIRSCRAPPING,
            type: CardType_1.CardType.ACTIVE,
            resourceType: CardResource_1.CardResource.FLOATER,
            victoryPoints: 2,
            metadata: {
                cardNumber: 'C43',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 titanium to add 2 floaters here.', (eb) => {
                        eb.titanium(1).startAction.resource(CardResource_1.CardResource.FLOATER, 4);
                    }).br;
                    b.or().br;
                    b.action('Spend 2 floaters here to increase your TR 1 step.', (eb) => {
                        eb.resource(CardResource_1.CardResource.FLOATER, 2).startAction.tr(1);
                    });
                }),
            },
        });
    }
    canAct(player) {
        if (player.titanium > 0) {
            return true;
        }
        if (this.resourceCount >= 2) {
            return player.canAfford({ cost: 0, tr: { tr: 1 } });
        }
        return false;
    }
    action(player) {
        const opts = [];
        const addResource = new SelectOption_1.SelectOption('Spend 1 titanium to add 4 floaters on this card', 'Spend titanium').andThen(() => this.addResource(player));
        const spendResource = new SelectOption_1.SelectOption('Remove 2 floaters on this card to increase your TR 1 step', 'Remove floaters').andThen(() => this.spendResource(player));
        if (this.resourceCount >= 2 && player.canAfford({ cost: 0, tr: { tr: 1 } })) {
            opts.push(spendResource);
        }
        if (player.titanium > 0) {
            opts.push(addResource);
        }
        if (opts.length === 1) {
            return opts[0].cb(undefined);
        }
        return new OrOptions_1.OrOptions(...opts);
    }
    addResource(player) {
        player.pay(Payment_1.Payment.of({ titanium: 1 }));
        player.addResourceTo(this, { qty: 4, log: true });
        return undefined;
    }
    spendResource(player) {
        player.removeResourceFrom(this, 2);
        player.increaseTerraformRating();
        return undefined;
    }
}
exports.TitanAirScrapping = TitanAirScrapping;
