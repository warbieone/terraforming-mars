"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstLunarSettlement = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const Tag_1 = require("../../../common/cards/Tag");
const PreludeCard_1 = require("../prelude/PreludeCard");
const CardRenderer_1 = require("../render/CardRenderer");
const TileType_1 = require("../../../common/TileType");
const AltSecondaryTag_1 = require("../../../common/cards/render/AltSecondaryTag");
class FirstLunarSettlement extends PreludeCard_1.PreludeCard {
    constructor() {
        super({
            name: CardName_1.CardName.FIRST_LUNAR_SETTLEMENT,
            tags: [Tag_1.Tag.CITY, Tag_1.Tag.MOON],
            tilesBuilt: [TileType_1.TileType.MOON_HABITAT],
            behavior: {
                production: { megacredits: 1 },
                moon: { habitatTile: {} },
            },
            metadata: {
                description: 'Place a habitat tile on The Moon and raise the habitat rate 1 step. Increase your M€ production 1 step.',
                cardNumber: '',
                renderData: CardRenderer_1.CardRenderer.builder((b) => {
                    b.production((pb) => pb.megacredits(1)).moonHabitat({ secondaryTag: AltSecondaryTag_1.AltSecondaryTag.MOON_HABITAT_RATE });
                }),
            },
        });
    }
}
exports.FirstLunarSettlement = FirstLunarSettlement;
