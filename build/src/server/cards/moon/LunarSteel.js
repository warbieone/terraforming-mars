"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarSteel = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
const Card_1 = require("../Card");
class LunarSteel extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_STEEL,
            type: CardType_1.CardType.ACTIVE,
            tags: [Tag_1.Tag.MOON],
            cost: 5,
            behavior: {
                steelValue: 1,
            },
            metadata: {
                cardNumber: 'M87',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Your steel resources are worth 1 M€ extra.', (eb) => {
                        eb.steel(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                    });
                }),
            },
        });
    }
}
exports.LunarSteel = LunarSteel;
