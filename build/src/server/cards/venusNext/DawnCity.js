"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DawnCity = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const CardType_1 = require("../../../common/cards/CardType");
const SpaceName_1 = require("../../SpaceName");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
class DawnCity extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.DAWN_CITY,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.SPACE],
            cost: 15,
            requirements: { tag: Tag_1.Tag.SCIENCE, count: 4 },
            victoryPoints: 3,
            behavior: {
                production: { energy: -1, titanium: 1 },
                city: { space: SpaceName_1.SpaceName.DAWN_CITY },
            },
            metadata: {
                cardNumber: '220',
                description: 'Requires 4 science tags. Decrease your energy production 1 step. Increase your titanium production 1 step. Place a city tile on the RESERVED AREA.',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).br;
                        pb.plus().titanium(1);
                    }).nbsp.city().asterix();
                }),
            },
        });
    }
}
exports.DawnCity = DawnCity;
