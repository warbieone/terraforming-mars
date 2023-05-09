"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreatDamAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const GreatDamPromo_1 = require("../promo/GreatDamPromo");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
class GreatDamAres extends GreatDamPromo_1.GreatDamPromo {
    constructor() {
        super(CardName_1.CardName.GREAT_DAM_ARES, { bonus: [SpaceBonus_1.SpaceBonus.ENERGY, SpaceBonus_1.SpaceBonus.ENERGY] }, {
            cardNumber: 'A25',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.production((pb) => pb.energy(2)).tile(TileType_1.TileType.GREAT_DAM, false, true).asterix();
            }),
            description: 'Requires 4 ocean tiles. Increase your energy production 2 steps. Place this tile ADJACENT TO an ocean tile. The tile grants an ADJACENCY BONUS of 2 Energy.',
        });
    }
}
exports.GreatDamAres = GreatDamAres;
