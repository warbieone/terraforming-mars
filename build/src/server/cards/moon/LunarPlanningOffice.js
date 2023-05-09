"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarPlanningOffice = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardRenderer_1 = require("../render/CardRenderer");
class LunarPlanningOffice extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.LUNAR_PlANNING_OFFICE,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            behavior: {
                stock: { steel: 6 },
                drawCard: { tag: Tag_1.Tag.MOON, count: 2 },
            },
            metadata: {
                description: 'Draw 2 cards with a Moon tag. Gain 6 steel.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2, { secondaryTag: Tag_1.Tag.MOON }).br.steel(6);
                }),
            },
        });
    }
}
exports.LunarPlanningOffice = LunarPlanningOffice;
