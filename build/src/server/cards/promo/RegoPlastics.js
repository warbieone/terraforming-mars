"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegoPlastics = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class RegoPlastics extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.REGO_PLASTICS,
            tags: [Tag_1.Tag.BUILDING],
            cost: 10,
            victoryPoints: 1,
            behavior: {
                steelValue: 1,
            },
            metadata: {
                cardNumber: 'X10',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Your steel resources are worth 1 M€ extra.', (eb) => {
                        eb.steel(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                    });
                }),
            },
        });
    }
}
exports.RegoPlastics = RegoPlastics;
