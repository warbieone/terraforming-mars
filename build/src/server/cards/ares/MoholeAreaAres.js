"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoholeAreaAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const MoholeArea_1 = require("../base/MoholeArea");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
class MoholeAreaAres extends MoholeArea_1.MoholeArea {
    constructor() {
        super(CardName_1.CardName.MOHOLE_AREA_ARES, { bonus: [SpaceBonus_1.SpaceBonus.HEAT, SpaceBonus_1.SpaceBonus.HEAT] }, {
            cardNumber: 'A16',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.production((pb) => pb.heat(4, { digit: Options_1.digit })).br;
                b.tile(TileType_1.TileType.MOHOLE_AREA, false, true);
            }),
            description: 'Increase your heat production 4 steps. Place this tile ON AN AREA RESERVED FOR OCEAN. The tile grants an ADJACENCY BONUS of 2 heat.',
        });
    }
}
exports.MoholeAreaAres = MoholeAreaAres;
