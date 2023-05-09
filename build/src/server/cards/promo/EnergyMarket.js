"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyMarket = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const Resource_1 = require("../../../common/Resource");
const SelectOption_1 = require("../../inputs/SelectOption");
const OrOptions_1 = require("../../inputs/OrOptions");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const SelectPaymentDeferred_1 = require("../../deferredActions/SelectPaymentDeferred");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class EnergyMarket extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ENERGY_MARKET,
            tags: [Tag_1.Tag.POWER],
            cost: 3,
            metadata: {
                cardNumber: 'X03',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend 2X M€ to gain X energy.', (eb) => {
                        eb.megacredits(2, { multiplier: Options_1.multiplier }).startAction.text('x').energy(1);
                    }).br;
                    b.or().br;
                    b.action('Decrease energy production 1 step to gain 8 M€.', (eb) => {
                        eb.production((pb) => pb.energy(1)).startAction.megacredits(8);
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.canAfford(2) || player.production.energy >= 1;
    }
    getEnergyOption(player, availableMC) {
        return new SelectAmount_1.SelectAmount('Select amount of energy to gain', 'Gain energy', (amount) => {
            player.game.defer(new SelectPaymentDeferred_1.SelectPaymentDeferred(player, amount * 2, {
                afterPay: () => player.addResource(Resource_1.Resource.ENERGY, amount, { log: true }),
            }));
            return undefined;
        }, 1, Math.floor(availableMC / 2));
    }
    getMegacreditsOption(player) {
        player.production.add(Resource_1.Resource.ENERGY, -1);
        player.addResource(Resource_1.Resource.MEGACREDITS, 8);
        player.game.log('${0} decreased energy production 1 step to gain 8 M€', (b) => b.player(player));
        return undefined;
    }
    action(player) {
        const availableMC = player.spendableMegacredits();
        if (availableMC >= 2 && player.production.energy >= 1) {
            return new OrOptions_1.OrOptions(new SelectOption_1.SelectOption('Spend 2X M€ to gain X energy', 'Spend M€', () => {
                return this.getEnergyOption(player, availableMC);
            }), new SelectOption_1.SelectOption('Decrease energy production 1 step to gain 8 M€', 'Decrease energy', () => {
                return this.getMegacreditsOption(player);
            }));
        }
        else if (availableMC >= 2) {
            return this.getEnergyOption(player, availableMC);
        }
        else if (player.production.energy >= 1) {
            return this.getMegacreditsOption(player);
        }
        return undefined;
    }
}
exports.EnergyMarket = EnergyMarket;
