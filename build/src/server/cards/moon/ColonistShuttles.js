"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColonistShuttles = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const Size_1 = require("../../../common/cards/render/Size");
const Options_1 = require("../Options");
class ColonistShuttles extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.COLONIST_SHUTTLES,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.SPACE],
            cost: 12,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: { habitatRate: 1 },
                stock: { megacredits: { moon: { habitat: {} }, each: 2 } },
            },
            metadata: {
                description: 'Spend 1 titanium. Raise the habitat rate 1 step. Gain 2M€ for each habitat tile on The Moon.',
                cardNumber: 'M16',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).moonHabitatRate().br;
                    b.megacredits(2).slash().moonHabitat({ size: Size_1.Size.SMALL, all: Options_1.all });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.ColonistShuttles = ColonistShuttles;
