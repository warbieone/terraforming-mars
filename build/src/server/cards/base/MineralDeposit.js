"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MineralDeposit = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MineralDeposit extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.MINERAL_DEPOSIT,
            cost: 5,
            behavior: {
                stock: { steel: 5 },
            },
            metadata: {
                cardNumber: '062',
                renderData: CardRenderer_1.CardRenderer.builder((b) => b.steel(5, { digit: Options_1.digit })),
                description: 'Gain 5 steel.',
            },
        });
    }
}
exports.MineralDeposit = MineralDeposit;
