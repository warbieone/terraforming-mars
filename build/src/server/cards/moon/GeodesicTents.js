"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeodesicTents = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class GeodesicTents extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.GEODESIC_TENTS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.PLANT, Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            cost: 13,
            reserveUnits: { titanium: 1 },
            behavior: {
                production: { energy: -1, plants: 1 },
                moon: { habitatTile: {} },
            },
            metadata: {
                description: 'Decrease your energy production 1 step and increase your plant production 1 step. ' +
                    'Spend 1 titanium. Place a habitat tile on The Moon and raise the habitat rate 1 step.',
                cardNumber: 'M06',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).nbsp.plus().plants(1);
                    }).br;
                    b.minus().titanium(1).br;
                    b.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.GeodesicTents = GeodesicTents;
