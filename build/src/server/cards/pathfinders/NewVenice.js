"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewVenice = void 0;
const Card_1 = require("../Card");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
class NewVenice extends Card_1.Card {
    constructor() {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: CardName_1.CardName.NEW_VENICE,
            tags: [Tag_1.Tag.MARS, Tag_1.Tag.POWER, Tag_1.Tag.BUILDING, Tag_1.Tag.CITY],
            cost: 21,
            behavior: {
                production: { energy: 1, megacredits: 2 },
                tile: {
                    type: TileType_1.TileType.OCEAN_CITY,
                    on: 'upgradeable-ocean',
                },
            },
            reserveUnits: { plants: 2 },
            requirements: { oceans: 3 },
            metadata: {
                cardNumber: 'Pf3',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().plants(2).br;
                    b.production((pb) => {
                        pb.energy(1).megacredits(2);
                    }).nbsp.tile(TileType_1.TileType.OCEAN_CITY, false, true);
                }),
                description: 'Requires 3 ocean tiles. Lose 2 plants. Increase your energy production 1 step and your M€ production 2 steps. ' +
                    'Place this tile on top of an existing ocean tile, IGNORING NORMAL PLACEMENT RESTRICTIONS FOR CITIES. The tile counts as a city as well as an ocean.',
            },
        });
    }
}
exports.NewVenice = NewVenice;
