"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerInfrastructure = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const SelectAmount_1 = require("../../inputs/SelectAmount");
const CardName_1 = require("../../../common/cards/CardName");
const Resource_1 = require("../../../common/Resource");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class PowerInfrastructure extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.POWER_INFRASTRUCTURE,
            tags: [Tag_1.Tag.POWER, Tag_1.Tag.BUILDING],
            cost: 4,
            metadata: {
                cardNumber: '194',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.action('Spend any amount of energy and gain that amount of M€.', (eb) => {
                        eb.text('x').energy(1).startAction.megacredits(0, { multiplier: Options_1.multiplier });
                    });
                }),
            },
        });
    }
    canAct(player) {
        return player.energy > 0;
    }
    action(player) {
        return new SelectAmount_1.SelectAmount('Select amount of energy to spend', 'Spend energy', (amount) => {
            player.deductResource(Resource_1.Resource.ENERGY, amount);
            player.addResource(Resource_1.Resource.MEGACREDITS, amount, { log: true });
            return undefined;
        }, 1, player.energy);
    }
}
exports.PowerInfrastructure = PowerInfrastructure;
