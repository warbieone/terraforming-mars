"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobinsonIndustries = void 0;
const CorporationCard_1 = require("../corporation/CorporationCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const titles_1 = require("../../inputs/titles");
class RobinsonIndustries extends CorporationCard_1.CorporationCard {
    constructor() {
        super({
            name: CardName_1.CardName.ROBINSON_INDUSTRIES,
            tags: [Tag_1.Tag.WILD],
            startingMegaCredits: 40,
            behavior: {
                production: { megacredits: 2 },
            },
            metadata: {
                cardNumber: 'R27',
                description: 'You start with 40 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(40);
                    b.corpBox('action', (ce) => {
                        ce.action('Spend 4 M€ to increase (one of) your LOWEST production 1 step.', (eb) => {
                            eb.megacredits(4).startAction.production((pb) => pb.wild(1).asterix());
                        });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.canAfford(4);
    }
    action(player) {
        let minimum = player.production.megacredits;
        let lowest = [];
        Resource_1.ALL_RESOURCES.forEach((resource) => {
            const option = new SelectOption_1.SelectOption('Increase ' + resource + ' production 1 step').andThen(() => {
                player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, 4, { title: titles_1.TITLES.payForCardAction(this.name) }))
                    .andThen(() => player.production.add(resource, 1, { log: true }));
                return undefined;
            });
            if (player.production[resource] < minimum) {
                lowest = [];
                minimum = player.production[resource];
            }
            if (player.production[resource] === minimum)
                lowest.push(option);
        });
        const result = new OrOptions_1.OrOptions();
        result.options = lowest;
        return result;
    }
}
exports.RobinsonIndustries = RobinsonIndustries;
