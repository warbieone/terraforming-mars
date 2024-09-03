"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloaterLeasing = void 0;
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const Card_1 = require("../Card");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const CardResource_1 = require("../../../common/CardResource");
class FloaterLeasing extends Card_1.Card {
    constructor() {
        super({
            cost: 3,
            name: CardName_1.CardName.FLOATER_LEASING,
            type: CardType_1.CardType.AUTOMATED,
            behavior: {
                production: { megacredits: { floaters: {}, per: 2 } },
            },
            metadata: {
                cardNumber: 'C10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).slash().resource(CardResource_1.CardResource.FLOATER, { amount: 2, digit: Options_1.digit });
                }),
                description: 'Increase your M€ production 1 step PER 2 floaters you have.',
            },
        });
    }
}
exports.FloaterLeasing = FloaterLeasing;
