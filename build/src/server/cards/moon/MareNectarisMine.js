"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MareNectarisMine = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const CardType_1 = require("../../../common/cards/CardType");
const Tag_1 = require("../../../common/cards/Tag");
const CardRenderer_1 = require("../render/CardRenderer");
const MoonSpaces_1 = require("../../../common/moon/MoonSpaces");
const TileType_1 = require("../../../common/TileType");
const Card_1 = require("../Card");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class MareNectarisMine extends Card_1.Card {
    constructor() {
        super({
            name: CardName_1.CardName.MARE_NECTARIS_MINE,
            type: CardType_1.CardType.AUTOMATED,
            tags: [Tag_1.Tag.MOON, Tag_1.Tag.BUILDING],
            cost: 14,
            behavior: {
                production: { steel: 1 },
                moon: {
                    mineTile: { space: MoonSpaces_1.MoonSpaces.MARE_NECTARIS },
                },
            },
            reserveUnits: { titanium: 1 },
            metadata: {
                description: 'Spend 1 titanium. Increase your steel production 1 step. Place a mine ON THE RESERVED AREA and raise the mining rate 1 step.',
                cardNumber: 'M01',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.minus().titanium(1).nbsp;
                    b.production((pb) => pb.steel(1));
                    b.moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE }).asterix();
                }),
            },
            tilesBuilt: [TileType_1.TileType.MOON_MINE],
        });
    }
}
exports.MareNectarisMine = MareNectarisMine;
