"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheWomb = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const Card_1 = require("../Card");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class TheWomb extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.THE_WOMB,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            cost: 16,
            behavior: {
                production: { energy: -2, megacredits: 4 },
                moon: {
                    habitatTile: {},
                },
            },
            reserveUnits: { titanium: 2 },
            metadata: {
                description: 'Decrease your energy production 2 steps and increase your M€ production 4 steps. ' +
                    'Spend 2 titanium. Place a habitat tile on The Moon and raise the habitat rate 1 step.',
                cardNumber: 'M08',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => {
                        pb.minus().energy(2).nbsp.plus().megacredits(4);
                    }).br;
                    b.minus().titanium(2).moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE });
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
        });
    }
}
exports.TheWomb = TheWomb;
