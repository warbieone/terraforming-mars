"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ryu = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const CeoCard_1 = require("./CeoCard");
const OrOptions_1 = require("../../inputs/OrOptions");
const Resource_1 = require("../../../common/Resource");
const SelectOption_1 = require("../../inputs/SelectOption");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const MessageBuilder_1 = require("../../logs/MessageBuilder");
class Ryu extends CeoCard_1.CeoCard {
    constructor() {
        super({
            name: CardName_1.CardName.RYU,
            metadata: {
                cardNumber: 'L30',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.opgArrow().text('ACTIVATE THE BELOW ABILITY');
                    b.br;
                    b.text('SWAP X+2').production((pb) => pb.wild(1));
                    b.br.br;
                }),
                description: 'Once per game, swap up to X+2 units of production between two resources, where X is the current generation number.',
            },
        });
    }
    canAct(player) {
        if (!super.canAct(player)) {
            return false;
        }
        return player.production.megacredits +
            player.production.steel +
            player.production.titanium +
            player.production.plants +
            player.production.energy +
            player.production.heat > -5;
    }
    action(player) {
        this.isDisabled = true;
        const choices = new OrOptions_1.OrOptions();
        Resource_1.ALL_RESOURCES.filter((r) => this.productionIsDecreasable(player, r)).forEach((resourceToDecrease) => {
            const selectOption = new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('Decrease ${0} production', (b) => b.string(resourceToDecrease)), 'Select', () => {
                let decreasable = player.production.get(resourceToDecrease);
                if (resourceToDecrease === Resource_1.Resource.MEGACREDITS)
                    decreasable += 5;
                const maxDecreasableAmt = Math.min(player.game.generation + 2, decreasable);
                return new SelectAmount_1.SelectAmount(`Select amount of ${resourceToDecrease} production to decrease`, 'Decrease', (amount) => {
                    const productionToIncrease = Resource_1.ALL_RESOURCES.filter((res) => res !== resourceToDecrease)
                        .map((res) => new SelectOption_1.SelectOption((0, MessageBuilder_1.newMessage)('Increase ${0} production', (b) => b.string(res)), 'Select', () => {
                        player.production.add(resourceToDecrease, -amount, { log: true });
                        player.production.add(res, amount, { log: true });
                        return undefined;
                    }));
                    return new OrOptions_1.OrOptions(...productionToIncrease);
                }, 1, maxDecreasableAmt, true);
            });
            choices.options.push(selectOption);
        });
        return choices;
    }
    productionIsDecreasable(player, resource) {
        let minProduction = 0;
        if (resource === Resource_1.Resource.MEGACREDITS)
            minProduction -= 5;
        return player.production.get(resource) > minProduction;
    }
}
exports.Ryu = Ryu;
