"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningExpedition = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MiningExpedition extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.MINING_EXPEDITION,
            cost: 12,
            behavior: {
                stock: { steel: 2 },
                global: { oxygen: 1 },
                removeAnyPlants: 2,
            },
            metadata: {
                cardNumber: '063',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.oxygen(1).br;
                    b.minus().plants(-2, { all: Options_1.all });
                    b.steel(2);
                }),
                description: 'Raise oxygen 1 step. Remove 2 plants from any player. Gain 2 steel.',
            },
        });
    }
}
exports.MiningExpedition = MiningExpedition;
