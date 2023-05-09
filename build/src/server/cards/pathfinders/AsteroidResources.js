"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsteroidResources = void 0;
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const CardRenderer_1 = require("../render/CardRenderer");
const Tag_1 = require("../../../common/cards/Tag");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class AsteroidResources extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.ASTEROID_RESOURCES,
            cost: 17,
            tags: [Tag_1.Tag.JOVIAN, Tag_1.Tag.SPACE],
            reserveUnits: { energy: 3 },
            victoryPoints: 1,
            behavior: {
                or: {
                    autoSelect: true,
                    behaviors: [
                        {
                            title: 'Increase your steel and titanium production 1 step.',
                            spend: { energy: 3 },
                            production: { steel: 1, titanium: 1 },
                        },
                        {
                            title: 'Place an ocean, and gain 2 steel and one titanium.',
                            spend: { energy: 3 },
                            ocean: {},
                            stock: { steel: 2, titanium: 1 },
                        },
                    ],
                },
            },
            metadata: {
                cardNumber: 'Pf40',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().energy(3, { digit: Options_1.digit }).production((pb) => pb.steel(1).titanium(1)).br
                        .or(Size_1.Size.SMALL).br;
                    b.minus().energy(3, { digit: Options_1.digit }).oceans(1, { size: Size_1.Size.SMALL }).steel(2, { digit: Options_1.digit }).titanium(1);
                }),
                description: 'Spend 3 energy. Either increase your steel and titanium production one step, OR ' +
                    'place an ocean, and gain 2 steel and one titanium.',
            },
        });
    }
}
exports.AsteroidResources = AsteroidResources;
