"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cryptocurrency = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Resource_1 = require("../../../common/Resource");
const Tag_1 = require("../../../common/cards/Tag");
const CardResource_1 = require("../../../common/CardResource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
class Cryptocurrency extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.CRYPTOCURRENCY,
            cost: 6,
            tags: [Tag_1.Tag.POWER],
            resourceType: CardResource_1.CardResource.DATA,
            metadata: {
                cardNumber: 'Pf51',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 1 energy to add 1 data to this card.', (eb) => {
                        eb.energy(1).startAction.data({ amount: 1 }).or();
                    }).br;
                    b.action('Remove all data from this card to gain 3M€ per data removed.', (eb) => {
                        eb.text('x').data({ amount: 1 }).startAction.text('x').megacredits(3);
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.energy > 0 || this.resourceCount > 0;
    }
    action(player) {
        const firstOption = new SelectOption_1.SelectOption('Spend 1 energy to add 1 data to this card.', 'Spend energy', () => {
            player.deductResource(Resource_1.Resource.ENERGY, 1);
            player.addResourceTo(this, { qty: 1, log: true });
            return undefined;
        });
        const secondOption = new SelectOption_1.SelectOption('Remove all data from this card to gain 3M€ per data removed.', 'Spend data', () => {
            player.addResource(Resource_1.Resource.MEGACREDITS, 3 * this.resourceCount, { log: true });
            this.resourceCount = 0;
            return undefined;
        });
        if (this.resourceCount === 0) {
            firstOption.cb();
            return undefined;
        }
        if (player.energy === 0) {
            secondOption.cb();
            return undefined;
        }
        return new OrOptions_1.OrOptions(firstOption, secondOption);
    }
}
exports.Cryptocurrency = Cryptocurrency;
