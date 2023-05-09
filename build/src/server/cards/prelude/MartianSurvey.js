"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MartianSurvey = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const CardRequirements_1 = require("../CardRequirements");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MartianSurvey extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.EVENT,
            name: CardName_1.CardName.MARTIAN_SURVEY,
            tags: [Tag_1.Tag.SCIENCE],
            cost: 9,
            victoryPoints: 1,
            behavior: {
                drawCard: 2,
            },
            requirements: CardRequirements_1.CardRequirements.builder((b) => b.oxygen(4, { max: Options_1.max })),
            metadata: {
                cardNumber: 'P38',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.cards(2);
                }),
                description: 'Oxygen must be 4% or lower. Draw two cards.',
            },
        });
    }
}
exports.MartianSurvey = MartianSurvey;
