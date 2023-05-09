"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobinsonIndustries = void 0;
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectOption_1 = require("../../inputs/SelectOption");
const Resource_1 = require("../../../common/Resource");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const CardRenderer_1 = require("../render/CardRenderer");
class RobinsonIndustries extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.CORPORATION,
            name: CardName_1.CardName.ROBINSON_INDUSTRIES,
            startingMegaCredits: 47,
            metadata: {
                cardNumber: 'R27',
                description: 'You start with 47 M€.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.br.br.br;
                    b.megacredits(47);
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
            const option = new SelectOption_1.SelectOption('Increase ' + resource + ' production 1 step', 'Select', () => {
                player.payMegacreditsDeferred(4, 'Select how to pay for Robinson Industries action.', () => {
                    player.production.add(resource, 1, { log: true });
                });
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
