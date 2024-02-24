"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeimosDownAres = void 0;
const CardName_1 = require("../../../common/cards/CardName");
const SpaceBonus_1 = require("../../../common/boards/SpaceBonus");
const TileType_1 = require("../../../common/TileType");
const CardRenderer_1 = require("../render/CardRenderer");
const Options_1 = require("../Options");
const DeimosDownPromo_1 = require("../promo/DeimosDownPromo");
class DeimosDownAres extends DeimosDownPromo_1.DeimosDownPromo {
    constructor() {
        super(CardName_1.CardName.DEIMOS_DOWN_ARES, { bonus: [SpaceBonus_1.SpaceBonus.ASTEROID, SpaceBonus_1.SpaceBonus.STEEL] }, {
            cardNumber: 'A26',
            renderData: CardRenderer_1.CardRenderer.builder((b) => {
                b.temperature(3).br;
                b.tile(TileType_1.TileType.DEIMOS_DOWN, false, true).asterix().br;
                b.steel(4, { digit: Options_1.digit }).nbsp.minus().plants(-6, { all: Options_1.all });
            }),
            description: 'Raise temperature 3 steps and gain 4 steel. Place this tile ADJACENT TO no other city tile. It provides adjacency bonus of 1 asteroid and 1 steel.',
        });
    }
}
exports.DeimosDownAres = DeimosDownAres;
