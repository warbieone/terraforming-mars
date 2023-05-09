"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SphereHabitats = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class SphereHabitats extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.SPHERE_HABITATS,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            cost: 14,
            reserveUnits: { titanium: 1 },
            behavior: {
                moon: {
                    habitatTile: {},
                },
            },
            metadata: {
                description: 'Spend 1 titanium. Place a habitat tile on The Moon and raise the habitat rate 1 step.',
                cardNumber: 'M07',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).br;
                    b.moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.SphereHabitats = SphereHabitats;
