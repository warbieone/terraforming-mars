"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreMine = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardRenderer_1 = require("../render/CardRenderer");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
const TileType_1 = require("../../../common/TileType");
class CoreMine extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.CORE_MINE,
            tags: [Tag_1.Tag.MOON],
            behavior: {
                production: { titanium: 1 },
                moon: { mineTile: {} },
            },
            tilesBuilt: [TileType_1.TileType.MOON_MINE],
            metadata: {
                description: 'Place a mine tile on The Moon and raise the mining rate 1 step. Increase your titanium production 1 step.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.titanium(1)).moonMine({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_MINING_RATE });
                }),
            },
        });
    }
}
exports.CoreMine = CoreMine;
