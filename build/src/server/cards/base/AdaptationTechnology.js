"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdaptationTechnology = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class AdaptationTechnology extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.ACTIVE,
            name: CardName_1.CardName.ADAPTATION_TECHNOLOGY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 12,
            victoryPoints: 1,
            metadata: {
                cardNumber: '153',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.effect('Your global requirements are +2 or -2 steps, your choice in each case.', (eb) => {
                        eb.plate('Global requirements').startEffect.text('+/- 2');
                    });
                }),
            },
        });
    }
    getRequirementBonus() {
        return 2;
    }
}
exports.AdaptationTechnology = AdaptationTechnology;
