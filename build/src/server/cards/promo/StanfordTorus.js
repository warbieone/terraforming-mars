"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StanfordTorus = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
class StanfordTorus extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.STANFORD_TORUS,
            tags: [Tag_1.Tag.SPACE, Tag_1.Tag.CITY],
            cost: 12,
            victoryPoints: 2,
            behavior: {
                city: { space: SpaceName_1.SpaceName.STANFORD_TORUS },
            },
            metadata: {
                cardNumber: 'X12',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.city().asterix();
                }),
                description: 'Place a city tile IN SPACE, outside and separate from the planet.',
            },
        });
    }
}
exports.StanfordTorus = StanfordTorus;
