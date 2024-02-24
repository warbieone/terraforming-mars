"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalPreserveAres = void 0;
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardName_1 = require("../../../common/cards/CardName");
const NaturalPreserve_1 = require("../base/NaturalPreserve");
const CardRenderer_1 = require("../render/CardRenderer");
class NaturalPreserveAres extends NaturalPreserve_1.NaturalPreserve {
    constructor() {
        super(CardName_1.CardName.NATURAL_PRESERVE_ARES, { bonus: [SpaceBonus_1.SpaceBonus.MEGACREDITS] }, {
            cardNumber: 'A18',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.production((pb) => pb.megacredits(1)).nbsp.tile(TileType_1.TileType.NATURAL_PRESERVE, false, true).asterix();
            }),
            description: 'Oxygen must be 4% or less. Place this tile NEXT TO NO OTHER TILE. The tile grants an ADJACENCY BONUS of of 1 M€. Increase your M€ production 1 step.',
        });
    }
}
exports.NaturalPreserveAres = NaturalPreserveAres;
