"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecialDesign = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class SpecialDesign extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.SPECIAL_DESIGN,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 4,
            metadata: {
                cardNumber: '206',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.plate('Global requirements').colon().text('+/- 2');
                }),
                description: 'The next card you play this generation is +2 or -2 steps in global requirements, your choice.',
            },
        });
    }
    getRequirementBonus(player) {
        if (player.lastCardPlayed === this.name) {
            return 2;
        }
        return 0;
    }
}
exports.SpecialDesign = SpecialDesign;
