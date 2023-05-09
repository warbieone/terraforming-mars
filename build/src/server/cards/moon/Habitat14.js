"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Habitat14 = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
class Habitat14 extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.HABITAT_14,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            cost: 5,
            behavior: {
                production: { energy: -1, megacredits: -1 },
                moon: { habitatTile: {} },
            },
            reserveUnits: { titanium: 1 },
            metadata: {
                description: 'Decrease your energy production 1 step and your M€ production 1 step. Spend 1 titanium. Place a habitat tile on The Moon and raise the habitat rate 1 step.',
                cardNumber: 'M05',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(1).minus().megacredits(1);
                    }).br;
                    b.minus().titanium(1).br;
                    b.moonHabitat();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.Habitat14 = Habitat14;
