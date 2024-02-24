"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagneticFieldGeneratorsPromo = void 0;
const Tag_1 = require("../../../common/cards/Tag");
const Card_1 = require("../Card");
const CardType_1 = require("../../../common/cards/CardType");
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MagneticFieldGeneratorsPromo extends Card_1.Card {
    constructor(name = CardName_1.CardName.MAGNETIC_FIELD_GENERATORS_PROMO, adjacencyBonus = undefined, metadata = {
        cardNumber: 'X33',
        renderData: CardRenderer_1.CardRenderer.builder((b) => {
            b.production((pb) => {
                pb.minus().energy(4, { digit: Options_1.digit }).br;
                pb.plus().plants(2);
            }).br;
            b.tr(3, { digit: Options_1.digit }).tile(TileType_1.TileType.MAGNETIC_FIELD_GENERATORS, true).asterix();
        }),
        description: 'Decrease your energy production 4 steps and increase your plant production 2 steps. Raise your TR 3 steps. Place this tile.',
    }) {
        super({
            type: CardType_1.CardType.AUTOMATED,
            name: name,
            tags: [Tag_1.Tag.BUILDING],
            cost: 22,
            behavior: {
                production: { energy: -4, plants: 2 },
                tr: 3,
                tile: {
                    type: TileType_1.TileType.MAGNETIC_FIELD_GENERATORS,
                    on: 'land',
                    adjacencyBonus: adjacencyBonus,
                },
            },
            metadata,
        });
    }
}
exports.MagneticFieldGeneratorsPromo = MagneticFieldGeneratorsPromo;
