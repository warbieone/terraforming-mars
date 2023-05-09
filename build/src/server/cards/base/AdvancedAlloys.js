"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedAlloys = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Size_1 = require("../../../common/cards/render/Size");
class AdvancedAlloys extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ADVANCED_ALLOYS,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            behavior: {
                steelValue: 1,
                titanumValue: 1,
            },
            metadata: {
                cardNumber: '071',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Each titanium you have is worth 1 M€ extra.', (be) => {
                        be.titanium(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                    }).br;
                    b.effect('Each steel you have is worth 1 M€ extra.', (be) => {
                        be.steel(1).startEffect.plus(Size_1.Size.SMALL).megacredits(1);
                    });
                }),
            },
        });
    }
}
exports.AdvancedAlloys = AdvancedAlloys;
